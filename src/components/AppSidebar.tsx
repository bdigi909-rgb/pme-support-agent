import { Link, useRouterState, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { to: '/dashboard', label: 'Tableau de bord' },
  { to: '/chat', label: 'Agent de chat' },
  { to: '/documents', label: 'Documents' },
  { to: '/settings', label: 'Parametres' },
]

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate({ to: '/login' })
  }

  return (
    <aside className="flex h-dvh w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            S
          </span>
          Support<span className="text-primary">Agent</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-background hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <button
          onClick={handleSignOut}
          className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground"
        >
          Se deconnecter
        </button>
      </div>
    </aside>
  )
}