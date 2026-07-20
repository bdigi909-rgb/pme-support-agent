import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { useSubscription } from '@/hooks/useSubscription'

export const Route = createFileRoute('/_app/settings')({
  head: () => ({
    meta: [{ title: 'Parametres · SupportAgent' }],
  }),
  component: Settings,
})

function Settings() {
  const { user } = useAuth()
  const { companyName, isLoading, updateCompanyName, updatePassword } = useProfile(user)
  const { subscription, isLoading: subLoading } = useSubscription(user)

  const [nameInput, setNameInput] = useState('')
  const [nameStatus, setNameStatus] = useState('')
  const [isSavingName, setIsSavingName] = useState(false)

  const [newPassword, setNewPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState('')
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  useEffect(() => {
    setNameInput(companyName)
  }, [companyName])

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingName(true)
    setNameStatus('')

    const result = await updateCompanyName(nameInput)

    setIsSavingName(false)
    setNameStatus(result.error ? `Erreur: ${result.error}` : 'Enregistre.')
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword.length < 6) {
      setPasswordStatus('Le mot de passe doit contenir au moins 6 caracteres.')
      return
    }

    setIsSavingPassword(true)
    setPasswordStatus('')

    const result = await updatePassword(newPassword)

    setIsSavingPassword(false)
    setPasswordStatus(result.error ? `Erreur: ${result.error}` : 'Mot de passe modifie.')

    if (!result.error) {
      setNewPassword('')
    }
  }

  return (
    <div className="flex max-w-xl flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Parametres</h1>
        <p className="mt-2 text-muted-foreground">
          Gerez les informations de votre compte.
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Abonnement
        </h2>
        {subLoading ? (
          <p className="mt-4 text-sm text-muted-foreground">Chargement...</p>
        ) : subscription?.plan ? (
          <div className="mt-4">
            <p className="text-sm">
              Plan actuel : <span className="font-semibold capitalize">{subscription.plan}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Statut : {subscription.status}
            </p>
            {subscription.current_period_end && (
              <p className="mt-1 text-sm text-muted-foreground">
                Prochaine facturation : {new Date(subscription.current_period_end).toLocaleDateString('fr-FR')}
              </p>
            )}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Aucun abonnement actif. Consultez nos tarifs pour vous abonner.
          </p>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Profil
        </h2>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>

        <form onSubmit={handleSaveName} className="mt-4 flex flex-col gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Nom de l'entreprise</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              disabled={isLoading}
              placeholder="Votre entreprise"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSavingName}
            className="w-fit rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {isSavingName ? 'Enregistrement...' : 'Enregistrer'}
          </button>

          {nameStatus && (
            <p className={`text-sm ${nameStatus.startsWith('Erreur') ? 'text-red-500' : 'text-green-600'}`}>
              {nameStatus}
            </p>
          )}
        </form>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Mot de passe
        </h2>

        <form onSubmit={handleChangePassword} className="mt-4 flex flex-col gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Nouveau mot de passe</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSavingPassword}
            className="w-fit rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {isSavingPassword ? 'Modification...' : 'Changer le mot de passe'}
          </button>

          {passwordStatus && (
            <p className={`text-sm ${passwordStatus.startsWith('Erreur') || passwordStatus.startsWith('Le mot') ? 'text-red-500' : 'text-green-600'}`}>
              {passwordStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}