import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import { useChat } from '@/hooks/useChat'
import { useConversations } from '@/hooks/useConversations'
import { useSubscription } from '@/hooks/useSubscription'
import { SubscriptionGate } from '@/components/SubscriptionGate'
import { ChatMessages } from '@/components/chat/ChatMessages'
import { ChatInput } from '@/components/chat/ChatInput'

export const Route = createFileRoute('/_app/chat')({
  head: () => ({
    meta: [{ title: 'Agent de chat · SupportAgent' }],
  }),
  component: ChatAgent,
})

function ChatAgent() {
  const { user } = useAuth()
  const { messages, isLoading, sendMessage, rateMessage, conversationId, startNewConversation, loadConversation } = useChat(user)
  const { conversations, isLoading: convsLoading, refetch: refetchConversations } = useConversations(user)
  const { subscription, isLoading: subLoading } = useSubscription(user)

  const handleSend = async (text: string) => {
    await sendMessage(text)
    refetchConversations()
  }

  if (subLoading) {
    return <div className="flex h-dvh items-center justify-center text-sm text-muted-foreground">Chargement...</div>
  }

  if (subscription?.status !== 'active') {
    return <SubscriptionGate />
  }

  return (
    <div className="flex h-dvh">
      <div className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
        <div className="p-3">
          <button
            onClick={startNewConversation}
            className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            + Nouvelle conversation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {convsLoading ? (
            <p className="px-2 text-xs text-muted-foreground">Chargement...</p>
          ) : conversations.length === 0 ? (
            <p className="px-2 text-xs text-muted-foreground">Aucune conversation.</p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => loadConversation(conv.id)}
                className={`mb-1 block w-full truncate rounded-lg px-3 py-2 text-left text-xs ${
                  conversationId === conv.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-background'
                }`}
              >
                {conv.preview}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="shrink-0 border-b border-border px-6 py-4">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Agent de chat</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Posez vos questions a votre agent SupportAgent.
          </p>
        </div>

        <ChatMessages messages={messages} isLoading={isLoading} onRate={rateMessage} />
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  )
}