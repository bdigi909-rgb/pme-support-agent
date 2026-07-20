import { useCallback, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { extractPdfText } from '@/lib/extractPdfText'
import { extractDocxText } from '@/lib/extractDocxText'
import { chunkText, generateEmbedding } from '@/lib/embeddings'

export interface DocumentRow {
  id: string
  name: string
  created_at: string
}

export function useDocuments(user: User | null) {
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [uploadProgress, setUploadProgress] = useState('')

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
      const isDocxFile =
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.name.endsWith('.docx')

      if (!isTextFile && !isPdfFile && !isDocxFile) {
        return { error: 'Seuls les fichiers .txt, .pdf et .docx sont acceptes pour le moment.' }
      }

      const { data: existing } = await supabase
        .from('documents')
        .select('id')
        .eq('user_id', user.id)
        .eq('name', file.name)
        .maybeSingle()

      if (existing) {
        return { error: `Un document nomme "${file.name}" existe deja. Supprimez-le d'abord ou renommez le fichier.` }
      }

      let content = ''

      try {
        if (isPdfFile) {
          content = await extractPdfText(file)
        } else if (isDocxFile) {
          content = await extractDocxText(file)
        } else {
          content = await file.text()
        }
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

      const { data: docData, error: insertError } = await supabase
        .from('documents')
        .insert({ user_id: user.id, name: file.name, content })
        .select('id')
        .single()

      if (insertError || !docData) {
        return { error: insertError?.message ?? 'Erreur lors de la creation du document.' }
      }

      try {
        const chunks = chunkText(content)

        for (let i = 0; i < chunks.length; i++) {
          setUploadProgress(`Analyse du contenu... ${i + 1}/${chunks.length}`)
          const embedding = await generateEmbedding(chunks[i])

          await supabase.from('document_chunks').insert({
            document_id: docData.id,
            user_id: user.id,
            content: chunks[i],
            embedding,
          })
        }
      } catch (err) {
        console.error('Erreur generation embeddings:', err)
      }

      setUploadProgress('')
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
  const migrateDocumentToVectors = useCallback(
    async (docId: string, content: string) => {
      if (!user) return

      const chunks = chunkText(content)

      for (let i = 0; i < chunks.length; i++) {
        const embedding = await generateEmbedding(chunks[i])
        await supabase.from('document_chunks').insert({
          document_id: docId,
          user_id: user.id,
          content: chunks[i],
          embedding,
        })
      }
    },
    [user],
  )

  const migrateAllDocuments = useCallback(async () => {
    if (!user) return

    const { data: docs } = await supabase
      .from('documents')
      .select('id, content')
      .eq('user_id', user.id)
      .not('content', 'is', null)

    if (!docs) return

    for (const doc of docs) {
      const { count } = await supabase
        .from('document_chunks')
        .select('id', { count: 'exact', head: true })
        .eq('document_id', doc.id)

      if (count === 0 && doc.content) {
        setUploadProgress(`Migration en cours...`)
        await migrateDocumentToVectors(doc.id, doc.content)
      }
    }

    setUploadProgress('')
    await refetch()
  }, [user, migrateDocumentToVectors, refetch])

  return { documents, isLoading, uploadDocument, deleteDocument, refetch, uploadProgress, migrateAllDocuments }
}