const features = [
  {
    icon: '📧',
    title: 'Réponses email automatiques',
    description:
      'Votre agent lit et répond aux emails de vos clients en s\'appuyant sur vos documents internes.',
  },
  {
    icon: '💬',
    title: 'Intégration WhatsApp',
    description:
      'Connectez votre numéro WhatsApp Business et laissez l\'IA gérer les conversations courantes.',
  },
  {
    icon: '🌐',
    title: 'Chat sur votre site',
    description:
      "Un widget de chat facile à intégrer, disponible 24/7 pour répondre à vos visiteurs.",
  },
  {
    icon: '📚',
    title: 'Basé sur vos documents',
    description:
      'PDF, FAQ, fiches produits : votre agent apprend directement depuis vos propres ressources.',
  },
  {
    icon: '🌍',
    title: 'Multilingue',
    description:
      'Support en français, arabe, darija et bien d\'autres langues selon vos besoins.',
  },
  {
    icon: '📊',
    title: 'Suivi & statistiques',
    description:
      'Suivez le nombre de conversations, les documents actifs et la satisfaction client.',
  },
]

export function Features() {
  return (
    <section id="fonctionnalites" className="bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Fonctionnalités
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Tout ce qu'il faut pour automatiser votre support
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}