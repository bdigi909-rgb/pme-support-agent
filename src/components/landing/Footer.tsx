import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                💬
              </span>
              Support<span className="text-primary">Agent</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Le support client IA pensé pour les PME. Simple, rapide, disponible 24/7.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 font-semibold">Produit</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#comment-ca-marche" className="hover:text-foreground">Comment ça marche</a></li>
                <li><a href="#fonctionnalites" className="hover:text-foreground">Fonctionnalités</a></li>
                <li><a href="#tarifs" className="hover:text-foreground">Tarifs</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold">Compte</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-foreground">Connexion</Link></li>
                <li><Link to="/dashboard" className="hover:text-foreground">Essai gratuit</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold">Legal</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/mentions-legales" className="hover:text-foreground">Mentions legales</Link></li>
                <li><Link to="/confidentialite" className="hover:text-foreground">Confidentialite</Link></li>
                <li><Link to="/cgu" className="hover:text-foreground">CGU</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SupportAgent. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}