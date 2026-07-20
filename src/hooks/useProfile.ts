import { useCallback, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function useProfile(user: User | null) {
  const [companyName, setCompanyName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const refetch = useCallback(async () => {
    if (!user) return
    setIsLoading(true)

    const { data } = await supabase
      .from('profiles')
      .select('company_name')
      .eq('id', user.id)
      .maybeSingle()

    setCompanyName(data?.company_name ?? '')
    setIsLoading(false)
  }, [user])

  useEffect(() => {
    refetch()
  }, [refetch])

  const updateCompanyName = useCallback(
    async (name: string) => {
      if (!user) return { error: 'Non connecte' }

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, company_name: name, updated_at: new Date().toISOString() })

      if (error) return { error: error.message }

      setCompanyName(name)
      return { error: null }
    },
    [user],
  )

  const updatePassword = useCallback(async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    return { error: error?.message ?? null }
  }, [])

  return { companyName, isLoading, updateCompanyName, updatePassword }
}