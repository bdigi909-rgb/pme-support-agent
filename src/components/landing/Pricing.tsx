import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

const plans = [
  {
    name: 'Starter',
    price: '29 EUR',
    period: '/mois',
    priceId: 'price_1TvLZ6AjUgyvbyFwrV7nWuXf',
    description: 'Ideal pour tester avec un petit volume de conversations.',
    features: [
      "Jusqu'a 200 conversations/mois",
      '1 canal (email ou chat)',
      '5 documents importes',
      'Support par email',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '79 EUR',
    period: '/mois',
    priceId: 'price_1TvLXYAjUgyvbyFwSm2psIRD',
    description: 'Le choix des PME qui veulent automatiser tout leur support.',
    features: [
      'Conversations illimitees',
      'Email, WhatsApp et chat',
      'Documents illimites',
      'Statistiques avancees',
      'Support prioritaire',
    ],
    highlighted: true,
  },
  {
    name: 'Entreprise',
    price: 'Sur devis',
    period: '',
    priceId: null,
    description: 'Pour les besoins specifiques et volumes importants.',
    features: [
      'Tout Pro inclus',
      'Integrations personnalisees',
      'Accompagnement dedie',
      'SLA garanti',
    ],
    highlighted: false,
  },
]

export function Pricing() {
  const navigate = useNavigate()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleSubscribe = async (priceId: string | null, planName: string) => {
    if (!priceId) {
      navigate({ to: '/', hash: 'tarifs' })
      return
    }

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      navigate({ to: '/login' })
      return
    }

    setLoadingPlan(planName)

    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { priceId },
    })

    setLoadingPlan(null)

    if (error || !data?.url) {
      alert("Une erreur s'est produite. Veuillez reessayer.")
      return
    }

    window.location.href = data.url
  }

  return (
    <section id="tarifs" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Tarifs
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Un prix simple, adapte a votre taille
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
                  <span className="mt-0.5 text-primary">+</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.priceId, plan.name)}
              disabled={loadingPlan === plan.name}
              className={`mt-8 block w-full rounded-full px-4 py-2.5 text-center text-sm font-semibold disabled:opacity-50 ${
                plan.highlighted
                  ? 'bg-primary text-primary-foreground hover:opacity-90'
                  : 'border border-border text-foreground hover:bg-card'
              }`}
            >
              {loadingPlan === plan.name
                ? 'Redirection...'
                : plan.priceId
                  ? "S'abonner"
                  : 'Nous contacter'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}