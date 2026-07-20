import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/widget')({
  component: WidgetChat,
})

interface WidgetMessage {
  role: 'user' | 'assistant'
  content: string
}

function WidgetChat() {
  const params = new URLSearchParams(window.location.search)
  const ownerId = params.get('owner')

  const [messages, setMessages] = useState<WidgetMessage[]>([])
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || isLoading || !ownerId) return

    const userMessage: WidgetMessage = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setText('')
    setIsLoading(true)

    const { data, error } = await supabase.functions.invoke('chat', {
      body: {
        messages: updatedMessages,
        widgetOwnerId: ownerId,
      },
    })

    setIsLoading(false)

    if (error || data?.error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Desole, une erreur s'est produite." },
      ])
      return
    }

    const reply =
      data.choices?.[0]?.message?.content ??
      "Desole, je n'ai pas pu generer de reponse."

    setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
  }

  if (!ownerId) {
    return (
      <div className="flex h-dvh items-center justify-center p-6 text-center text-sm text-muted-foreground">
        Widget mal configure : identifiant manquant.
      </div>
    )
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      <div className="shrink-0 border-b border-border bg-primary px-4 py-3">
        <p className="text-sm font-semibold text-primary-foreground">Support en direct</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-center text-xs text-muted-foreground">
            Posez votre question, nous sommes la pour vous aider.
          </p>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-foreground'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
              En train d'ecrire...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex shrink-0 items-center gap-2 border-t border-border p-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ecrivez votre message..."
          disabled={isLoading}
          className="flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          Envoyer
        </button>
      </form>
    </div>
  )
}