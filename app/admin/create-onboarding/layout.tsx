export const metadata = {
  title: 'Onboarding erstellen | Admin Dashboard',
  description: 'Neue Onboarding-Session für Kunden erstellen',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CreateOnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
