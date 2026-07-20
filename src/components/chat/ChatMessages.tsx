import type { ChatMessage } from '@/hooks/useChat'

export function ChatMessages({
  messages,
  isLoading,
}: {
  messages: ChatMessage[]
  isLoading: boolean
}) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-6">
      {messages.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Posez une question pour commencer la conversation.
        </p>
      )}

      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground border border-border'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="rounded-2xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
            En train d'ecrire...
          </div>
        </div>
      )}
    </div>
  )
}