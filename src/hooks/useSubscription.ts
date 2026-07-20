import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export interface SubscriptionData {
  plan: string | null
  status: string | null
  current_period_end: string | null
}

export function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchSubscription = async () => {
      setIsLoading(true)

      const { data } = await supabase
        .from('subscriptions')
        .select('plan, status, current_period_end')
        .eq('user_id', user.id)
        .maybeSingle()

      setSubscription(data)
      setIsLoading(false)
    }

    fetchSubscription()
  }, [user])

  return { subscription, isLoading }
}