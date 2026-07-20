import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import { useDashboardStats } from '@/hooks/useDashboardStats'

export const Route = createFileRoute('/_app/dashboard')({
  head: () => ({
    meta: [
      { title: 'Tableau de bord · SupportAgent' },
    ],
  }),
  component: Dashboard,
})

function Dashboard() {
  const { user } = useAuth()
  const { conversationsCount, documentsCount, satisfactionRate, isLoading } = useDashboardStats(user)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Tableau de bord</h1>
      <p className="mt-2 text-muted-foreground">
        Bienvenue sur votre espace SupportAgent.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Conversations cette semaine"
          value={isLoading ? '...' : String(conversationsCount)}
        />
        <StatCard
          label="Documents actifs"
          value={isLoading ? '...' : String(documentsCount)}
        />
        <StatCard
          label="Taux de satisfaction"
          value={isLoading ? '...' : satisfactionRate !== null ? `${satisfactionRate}%` : '—'}
        />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
    </div>
  )
}