import { Link } from '@tanstack/react-router'

const plans = [
  {
    name: 'Starter',
    price: '29€',
    period: '/mois',
    description: 'Idéal pour tester avec un petit volume de conversations.',
    features: [
      "Jusqu'à 200 conversations/mois",
      '1 canal (email ou chat)',
      '5 documents importés',
      'Support par email',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '79€',
    period: '/mois',
    description: 'Le choix des PME qui veulent automatiser tout leur support.',
    features: [
      'Conversations illimitées',
      'Email, WhatsApp et chat',
      'Documents illimités',
      'Statistiques avancées',
      'Support prioritaire',
    ],
    highlighted: true,
  },
  {
    name: 'Entreprise',
    price: 'Sur devis',
    period: '',
    description: 'Pour les besoins spécifiques et volumes importants.',
    features: [
      'Tout Pro inclus',
      'Intégrations personnalisées',
      'Accompagnement dédié',
      'SLA garanti',
    ],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="tarifs" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Tarifs
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Un prix simple, adapté à votre taille
        </h2>
        <p className="mt-4 text-muted-foreground">
          Essai gratuit de 14 jours sur tous les plans. Sans engagement.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-8 ${
              plan.highlighted
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-border bg-card'
            }`}
          >
            {plan.highlighted && (
              <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Le plus populaire
              </span>
            )}
            <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/dashboard"
              className={`mt-8 block rounded-full px-4 py-2.5 text-center text-sm font-semibold ${
                plan.highlighted
                  ? 'bg-primary text-primary-foreground hover:opacity-90'
                  : 'border border-border text-foreground hover:bg-card'
              }`}
            >
              Essai gratuit
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}