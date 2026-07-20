import { Link } from '@tanstack/react-router'

export function SubscriptionGate() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md rounded-2xl border border-border bg-card p-8">
        <h2 className="text-xl font-semibold tracking-tight">Abonnement requis</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette fonctionnalite necessite un abonnement actif. Choisissez une formule pour y acceder.
        </p>
        <Link
          to="/"
          hash="tarifs"
          className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Voir les tarifs
        </Link>
      </div>
    </div>
  )
}