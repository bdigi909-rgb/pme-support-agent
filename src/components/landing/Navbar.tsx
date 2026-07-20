import { Link } from '@tanstack/react-router'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            💬
          </span>
          Support<span className="text-primary">Agent</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#comment-ca-marche" className="hover:text-foreground">Comment ça marche</a>
          <a href="#fonctionnalites" className="hover:text-foreground">Fonctionnalités</a>
          <a href="#tarifs" className="hover:text-foreground">Tarifs</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="hidden text-sm font-medium text-foreground hover:text-primary sm:block"
          >
            Connexion
          </Link>
          <Link
            to="/dashboard"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            ⚡ Essai gratuit
          </Link>
        </div>
      </div>
    </header>
  )
}