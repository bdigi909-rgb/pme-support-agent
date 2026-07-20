import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/mentions-legales')({
  head: () => ({
    meta: [{ title: 'Mentions legales · SupportAgent' }],
  }),
  component: MentionsLegales,
})

function MentionsLegales() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/" className="text-sm text-primary hover:underline">
        {'<-'} Retour a l'accueil
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">Mentions legales</h1>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-semibold text-foreground">Editeur du site</h2>
          <p className="mt-2">
            SupportAgent est edite par PRIMUS PRIMORUM, SASU au capital social variable,
            immatriculee au RCS de Melun sous le numero 106 725 807, dont le siege social est
            situe au 31 rue du Marechal Massena, 77340 Pontault-Combault, France.
          </p>
          <p className="mt-2">
            Numero de TVA intracommunautaire : FR27106725807
            <br />
            Email : primusprimorumconseil@gmail.com
            <br />
            Telephone : 07 44 03 71 60
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Directeur de la publication</h2>
          <p className="mt-2">Samir Lima, en qualite de representant legal de PRIMUS PRIMORUM.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Hebergement</h2>
          <p className="mt-2">
            Le site est heberge par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
            Etats-Unis.
          </p>
          <p className="mt-2">
            Les donnees applicatives sont hebergees par Supabase Inc., dans l'Union
            Europeenne (region West EU).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">Propriete intellectuelle</h2>
          <p className="mt-2">
            L'ensemble des contenus presents sur ce site (textes, logos, graphismes) sont la
            propriete exclusive de PRIMUS PRIMORUM, sauf mention contraire, et ne peuvent
            etre reproduits sans autorisation prealable.
          </p>
        </section>
      </div>
    </div>
  )
}