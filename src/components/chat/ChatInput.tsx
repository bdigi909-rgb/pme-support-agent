import { useState } from 'react'

export function ChatInput({
  onSend,
  isLoading,
}: {
  onSend: (text: string) => void
  isLoading: boolean
}) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || isLoading) return
    onSend(text)
    setText('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex shrink-0 items-center gap-3 border-t border-border p-4"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ecrivez votre message..."
        disabled={isLoading}
        className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm"
      />
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        Envoyer
      </button>
    </form>
  )
}