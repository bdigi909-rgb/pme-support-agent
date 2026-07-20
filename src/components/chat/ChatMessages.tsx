import type { ChatMessage } from '@/hooks/useChat'

export function ChatMessages({
  messages,
  isLoading,
  onRate,
}: {
  messages: ChatMessage[]
  isLoading: boolean
  onRate: (messageId: string, rating: 'positive' | 'negative') => void
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
          className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
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

          {msg.role === 'assistant' && msg.id && (
            <div className="mt-1.5 flex gap-1 px-1">
              <button
                onClick={() => onRate(msg.id!, 'positive')}
                className={`rounded px-1.5 py-0.5 text-xs ${
                  msg.rating === 'positive'
                    ? 'bg-green-100 text-green-700'
                    : 'text-muted-foreground hover:bg-card'
                }`}
                aria-label="Reponse utile"
              >
                +1
              </button>
              <button
                onClick={() => onRate(msg.id!, 'negative')}
                className={`rounded px-1.5 py-0.5 text-xs ${
                  msg.rating === 'negative'
                    ? 'bg-red-100 text-red-700'
                    : 'text-muted-foreground hover:bg-card'
                }`}
                aria-label="Reponse pas utile"
              >
                -1
              </button>
            </div>
          )}
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