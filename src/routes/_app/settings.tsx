import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/settings')({
  head: () => ({
    meta: [{ title: 'Paramètres · SupportAgent' }],
  }),
  component: Settings,
})

function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Paramètres</h1>
      <p className="mt-2 text-muted-foreground">
        Gérez votre abonnement et les paramètres de votre compte.
      </p>
      <div className="mt-8 rounded-xl border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">Fonctionnalité à venir — paramètres du compte.</p>
      </div>
    </div>
  )
}