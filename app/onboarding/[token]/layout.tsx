export const metadata = {
  title: 'Onboarding | Lars Macario - No/Low-Code Developer',
  description: 'Willkommen! Bitte geben Sie hier alle wichtigen Projektdaten für eine reibungslose Zusammenarbeit ein.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
