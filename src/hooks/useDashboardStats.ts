import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function useDashboardStats(user: User | null) {
  const [conversationsCount, setConversationsCount] = useState<number | null>(null)
  const [documentsCount, setDocumentsCount] = useState<number | null>(null)
  const [satisfactionRate, setSatisfactionRate] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchStats = async () => {
      setIsLoading(true)

      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      const [conversationsResult, documentsResult, ratingsResult] = await Promise.all([
        supabase
          .from('conversations')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('created_at', oneWeekAgo.toISOString()),
        supabase
          .from('documents')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
        supabase
          .from('messages')
          .select('rating, conversation_id, conversations!inner(user_id)')
          .eq('conversations.user_id', user.id)
          .not('rating', 'is', null),
      ])

      setConversationsCount(conversationsResult.count ?? 0)
      setDocumentsCount(documentsResult.count ?? 0)

      const ratings = ratingsResult.data ?? []
      if (ratings.length > 0) {
        const positiveCount = ratings.filter((r) => r.rating === 'positive').length
        setSatisfactionRate(Math.round((positiveCount / ratings.length) * 100))
      } else {
        setSatisfactionRate(null)
      }

      setIsLoading(false)
    }

    fetchStats()
  }, [user])

  return { conversationsCount, documentsCount, satisfactionRate, isLoading }
}