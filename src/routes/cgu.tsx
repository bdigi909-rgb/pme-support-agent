import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/cgu')({
  head: () => ({
    meta: [{ title: "Conditions generales d'utilisation - SupportAgent" }],
  }),
  component: Cgu,
})

function Cgu() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/" className="text-sm text-primary hover:underline">
        Retour a l'accueil
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        Conditions generales d'utilisation
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Derniere mise a jour : juillet 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground">1. Objet</h2>
          <p className="mt-2">
            Les presentes conditions generales d'utilisation regissent l'acces et
            l'utilisation du service SupportAgent, edite par PRIMUS PRIMORUM, permettant a
            une entreprise de creer un agent de support client automatise par intelligence
            artificielle, entraine a partir de ses propres documents.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">2. Inscription et compte</h2>
          <p className="mt-2">
            L'utilisation du service necessite la creation d'un compte avec une adresse email
            valide. L'utilisateur est responsable de la confidentialite de ses identifiants
            de connexion.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">3. Abonnements et facturation</h2>
          <p className="mt-2">
            Le service est propose sous forme d'abonnement mensuel, sans engagement de duree,
            resiliable a tout moment depuis l'espace client. Les paiements sont traites par
            Stripe. Aucun remboursement n'est effectue pour une periode d'abonnement deja
            entamee, sauf disposition legale contraire.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">4. Contenu importe par l'utilisateur</h2>
          <p className="mt-2">
            L'utilisateur est seul responsable des documents qu'il importe dans SupportAgent
            et garantit disposer des droits necessaires sur ces contenus. PRIMUS PRIMORUM ne
            saurait etre tenue responsable de l'exactitude des reponses generees par l'agent
            IA a partir de ces documents.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">5. Limitation de responsabilite</h2>
          <p className="mt-2">
            SupportAgent est fourni "en l'etat". PRIMUS PRIMORUM ne garantit pas l'absence
            totale d'erreurs ou d'interruptions du service et ne pourra etre tenue
            responsable des dommages indirects resultant de son utilisation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">6. Resiliation</h2>
          <p className="mt-2">
            L'utilisateur peut resilier son abonnement a tout moment depuis son espace
            client. PRIMUS PRIMORUM se reserve le droit de suspendre un compte en cas
            d'utilisation abusive ou contraire aux presentes conditions.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">7. Droit applicable</h2>
          <p className="mt-2">
            Les presentes conditions sont regies par le droit francais. Tout litige relatif a
            leur interpretation ou execution releve de la competence des tribunaux francais.
          </p>
        </section>
      </div>
    </div>
  )
}
