import { useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import { useDocuments } from '@/hooks/useDocuments'
import { useSubscription } from '@/hooks/useSubscription'
import { SubscriptionGate } from '@/components/SubscriptionGate'

export const Route = createFileRoute('/_app/documents')({
  head: () => ({
    meta: [{ title: 'Documents · SupportAgent' }],
  }),
  component: DocumentsPage,
})

function DocumentsPage() {
  const { user } = useAuth()
  const { documents, isLoading, uploadDocument, deleteDocument, uploadProgress, migrateAllDocuments } = useDocuments(user)
  const { subscription, isLoading: subLoading } = useSubscription(user)
  const [isMigrating, setIsMigrating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setIsUploading(true)
    const result = await uploadDocument(file)
    setIsUploading(false)

    if (result.error) {
      setError(result.error)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (subLoading) {
    return <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">Chargement...</div>
  }

  if (subscription?.status !== 'active') {
    return <SubscriptionGate />
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Documents</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Importez vos documents pour entrainer votre agent IA.
          </p>
        </div>
        <button
          onClick={async () => {
            setIsMigrating(true)
            await migrateAllDocuments()
            setIsMigrating(false)
          }}
          disabled={isMigrating}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-card disabled:opacity-50"
        >
          {isMigrating ? (uploadProgress || 'Migration...') : 'Migrer les anciens documents'}
        </button>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,text/plain,.pdf,application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
       <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          {isUploading ? (uploadProgress || 'Envoi en cours...') : 'Choisir un fichier'}
        </label>
        <p className="mt-3 text-sm text-muted-foreground">
          Fichiers texte (.txt), PDF et Word (.docx) acceptes
        </p>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Documents importes
        </h2>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Chargement...</p>
        ) : documents.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Aucun document pour le moment.
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
              >
                <span className="text-sm font-medium">{doc.name}</span>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}