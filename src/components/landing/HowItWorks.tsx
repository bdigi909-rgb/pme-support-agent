const steps = [
  {
    number: '1',
    icon: '📤',
    title: 'Déposez vos documents',
    description:
      "Importez vos PDF, fiches produits, FAQ, guides ou procédures internes. Notre IA les analyse en quelques minutes.",
  },
  {
    number: '2',
    icon: '🧠',
    title: "L'IA apprend votre métier",
    description:
      'Votre agent se forme sur votre contenu. Il connaît vos produits, vos tarifs et vos processus sur le bout des doigts.',
  },
  {
    number: '3',
    icon: '💬',
    title: 'Support automatique 24/7',
    description:
      'Vos clients reçoivent des réponses instantanées et pertinentes par email, WhatsApp ou chat. Vous libérez votre temps.',
  },
]

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Comment ça marche
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Opérationnel en 3 étapes
        </h2>
        <p className="mt-4 text-muted-foreground">
          Pas de développeur, pas de configuration complexe. Vous êtes libre
          d'essayer sans risque.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative rounded-2xl border border-border bg-card p-8"
          >
            <span className="absolute right-6 top-4 text-4xl font-bold text-muted-foreground/20">
              {step.number}
            </span>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}