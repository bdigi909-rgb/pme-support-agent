import { useCallback, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { extractPdfText } from '@/lib/extractPdfText'

export interface DocumentRow {
  id: string
  name: string
  created_at: string
}

export function useDocuments(user: User | null) {
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refetch = useCallback(async () => {
    if (!user) return
    setIsLoading(true)

    const { data } = await supabase
      .from('documents')
      .select('id, name, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    setDocuments(data ?? [])
    setIsLoading(false)
  }, [user])

  useEffect(() => {
    refetch()
  }, [refetch])

  const uploadDocument = useCallback(
    async (file: File) => {
      if (!user) return { error: 'Non connecte' }

      const isTextFile = file.type === 'text/plain' || file.name.endsWith('.txt')
      const isPdfFile = file.type === 'application/pdf' || file.name.endsWith('.pdf')

      if (!isTextFile && !isPdfFile) {
        return { error: 'Seuls les fichiers .txt et .pdf sont acceptes pour le moment.' }
      }

      let content = ''

      try {
        content = isPdfFile ? await extractPdfText(file) : await file.text()
      } catch {
        return { error: "Impossible de lire le contenu de ce fichier." }
      }

      const filePath = `${user.id}/${Date.now()}-${file.name}`

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) {
        return { error: uploadError.message }
      }

      const { error: insertError } = await supabase
        .from('documents')
        .insert({ user_id: user.id, name: file.name, content })

      if (insertError) {
        return { error: insertError.message }
      }

      await refetch()
      return { error: null }
    },
    [user, refetch],
  )

  const deleteDocument = useCallback(
    async (docId: string) => {
      await supabase.from('documents').delete().eq('id', docId)
      await refetch()
    },
    [refetch],
  )

  return { documents, isLoading, uploadDocument, deleteDocument, refetch }
}