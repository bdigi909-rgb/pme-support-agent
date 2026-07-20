import { Link } from '@tanstack/react-router'

export function Hero() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-20 text-center">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
        Propulse par IA - economique et simple
      </span>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Un support client
        <span className="block text-primary">qui ne dort jamais</span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Votre agent IA repond automatiquement aux emails, WhatsApp et chat de
        votre site web, base sur vos propres documents. Gagnez des heures
        chaque semaine, sans embaucher.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/dashboard"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Essai gratuit de 14 jours
        </Link>
        <a href="#comment-ca-marche" className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-card">
          Voir la demo
        </a>
      </div>
    </section>
  )
}
