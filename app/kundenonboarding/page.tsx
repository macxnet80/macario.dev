import CustomerOnboardingWizard from '@/components/CustomerOnboardingWizard'

export const metadata = {
  title: 'Kundenonboarding | Lars Macario - No/Low-Code Developer',
  description: 'Willkommen! Bitte geben Sie hier alle wichtigen Projektdaten für eine reibungslose Zusammenarbeit ein.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CustomerOnboardingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <CustomerOnboardingWizard />
    </main>
  )
}
