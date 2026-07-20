import { useCallback, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export interface ConversationRow {
  id: string
  created_at: string
  preview: string
}

export function useConversations(user: User | null) {
  const [conversations, setConversations] = useState<ConversationRow[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refetch = useCallback(async () => {
    if (!user) return
    setIsLoading(true)

    const { data: convs } = await supabase
      .from('conversations')
      .select('id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!convs) {
      setConversations([])
      setIsLoading(false)
      return
    }

    const withPreviews = await Promise.all(
      convs.map(async (conv) => {
        const { data: firstMsg } = await supabase
          .from('messages')
          .select('content')
          .eq('conversation_id', conv.id)
          .eq('role', 'user')
          .order('created_at', { ascending: true })
          .limit(1)
          .maybeSingle()

        return {
          id: conv.id,
          created_at: conv.created_at,
          preview: firstMsg?.content?.slice(0, 40) ?? 'Conversation vide',
        }
      }),
    )

    setConversations(withPreviews)
    setIsLoading(false)
  }, [user])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { conversations, isLoading, refetch }
}