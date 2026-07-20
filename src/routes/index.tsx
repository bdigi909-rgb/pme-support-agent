import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Features } from '@/components/landing/Features'
import { Pricing } from '@/components/landing/Pricing'
import { Footer } from '@/components/landing/Footer'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'SupportAgent — Votre support client IA 24/7 pour PME' },
      {
        name: 'description',
        content:
          'Un agent IA qui répond automatiquement aux emails, WhatsApp et chat de votre site basé sur vos documents. Essai gratuit 14 jours.',
      },
    ],
  }),
  component: Home,
})

function Home() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}