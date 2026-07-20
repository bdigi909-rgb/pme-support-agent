import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import { useChat } from '@/hooks/useChat'
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
  const { messages, isLoading, sendMessage } = useChat(user)

  return (
    <div className="flex h-dvh flex-col">
      <div className="shrink-0 border-b border-border px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Agent de chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Posez vos questions a votre agent SupportAgent.
        </p>
      </div>

      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  )
}