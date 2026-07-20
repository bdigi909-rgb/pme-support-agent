import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/confidentialite')({
  head: () => ({
    meta: [{ title: 'Politique de confidentialite · SupportAgent' }],
  }),
  component: Confidentialite,
})

function Confidentialite() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/" className="text-sm text-primary hover:underline">
        {'<-'} Retour a l'accueil
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">Politique de confidentialite</h1>
      <p className="mt-2 text-sm text-muted-foreground">Derniere mise a jour : juillet 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground">Donnees collectees</h2>
          <p className="mt-2">
            Dans le cadre de l'utilisation de SupportAgent, nous collectons : votre adresse
            email et mot de passe (chiffre) lors de l'inscription, le nom de votre entreprise
            si renseigne, les documents que vous importez pour entrainer votre agent IA, ainsi
            que l'historique de vos conversations avec l'agent.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Utilisation des donnees</h2>
          <p className="mt-2">
            Ces donnees sont utilisees exclusivement pour fournir le service SupportAgent :
            authentification, generation de reponses par l'agent IA a partir de vos documents,
            gestion de votre abonnement et facturation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Sous-traitants</h2>
          <p className="mt-2">
            Nous faisons appel aux prestataires suivants pour le fonctionnement du service :
            Supabase (hebergement des donnees et authentification), Groq (generation des
            reponses de l'agent IA), Stripe (traitement des paiements), Vercel (hebergement du
            site).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Duree de conservation</h2>
          <p className="mt-2">
            Vos donnees sont conservees pendant toute la duree de votre utilisation du
            service, et supprimees dans un delai raisonnable apres la suppression de votre
            compte, sauf obligation legale de conservation plus longue.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Vos droits</h2>
          <p className="mt-2">
            Conformement au Reglement General sur la Protection des Donnees (RGPD), vous
            disposez d'un droit d'acces, de rectification, de suppression et de portabilite
            de vos donnees. Pour exercer ces droits, contactez-nous a
            primusprimorumconseil@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Cookies</h2>
          <p className="mt-2">
            SupportAgent utilise uniquement des cookies techniques necessaires au
            fonctionnement du service (session d'authentification), aucun cookie publicitaire
            ou de tracking tiers n'est utilise.
          </p>
        </section>
      </div>
    </div>
  )
}