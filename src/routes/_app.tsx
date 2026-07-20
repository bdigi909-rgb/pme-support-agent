import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { AppSidebar } from '@/components/AppSidebar'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/_app')({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      throw redirect({ to: '/login' })
    }
  },
  component: AppLayoutWrapper,
})

function AppLayoutWrapper() {
  return (
    <div className="flex min-h-dvh">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}