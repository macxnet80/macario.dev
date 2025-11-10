export const metadata = {
  title: 'Admin Login | Lars Macario - No/Low-Code Developer',
  description: 'Administrator-Zugang zum Onboarding-Management System',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLoginLayout({
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
