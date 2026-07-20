import { useCallback, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { generateEmbedding } from '@/lib/embeddings'

export interface ChatMessage {
  id?: string
  role: 'user' | 'assistant'
  content: string
  rating?: 'positive' | 'negative' | null
}

export function useChat(user: User | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)

  const ensureConversation = useCallback(async () => {
    if (conversationId) return conversationId
    if (!user) return null

    const { data, error } = await supabase
      .from('conversations')
      .insert({ user_id: user.id })
      .select('id')
      .single()

    if (error || !data) return null

    setConversationId(data.id)
    return data.id
  }, [conversationId, user])

  const startNewConversation = useCallback(() => {
    setConversationId(null)
    setMessages([])
  }, [])

  const loadConversation = useCallback(async (convId: string) => {
    setConversationId(convId)

    const { data } = await supabase
      .from('messages')
      .select('id, role, content, rating')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true })

    setMessages(
      (data ?? []).map((m) => ({
        id: m.id,
        role: m.role as 'user' | 'assistant',
        content: m.content,
        rating: m.rating,
      })),
    )
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !user) return

      const userMessage: ChatMessage = { role: 'user', content: text }
      const updatedMessages = [...messages, userMessage]
      setMessages(updatedMessages)
      setIsLoading(true)

      const convId = await ensureConversation()

      if (convId) {
        await supabase.from('messages').insert({
          conversation_id: convId,
          role: 'user',
          content: text,
        })
      }

      try {
        const queryEmbedding = await generateEmbedding(text)

        const { data, error: fnError } = await supabase.functions.invoke('chat', {
          body: {
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            queryEmbedding,
          },
        })

        if (fnError) {
          throw new Error(fnError.message)
        }

        if (data.error) {
          throw new Error(data.error.message ?? 'Erreur inconnue')
        }

        const reply =
          data.choices?.[0]?.message?.content ??
          "Desole, je n'ai pas pu generer de reponse."

        let messageId: string | undefined

        if (convId) {
          const { data: insertedMsg } = await supabase
            .from('messages')
            .insert({
              conversation_id: convId,
              role: 'assistant',
              content: reply,
            })
            .select('id')
            .single()

          messageId = insertedMsg?.id
        }

        const assistantMessage: ChatMessage = { id: messageId, role: 'assistant', content: reply }
        setMessages((prev) => [...prev, assistantMessage])
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur de connexion.'
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Erreur: ${message}` },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [user, ensureConversation, messages],
  )

  const rateMessage = useCallback(
    async (messageId: string, rating: 'positive' | 'negative') => {
      await supabase.from('messages').update({ rating }).eq('id', messageId)

      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, rating } : m)),
      )
    },
    [],
  )

  return {
    messages,
    isLoading,
    sendMessage,
    rateMessage,
    conversationId,
    startNewConversation,
    loadConversation,
  }
}