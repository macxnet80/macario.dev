export const metadata = {
  title: 'Admin Dashboard | Lars Macario - No/Low-Code Developer',
  description: 'Administrator-Dashboard für Onboarding-Management',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminDashboardLayout({
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
