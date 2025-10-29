import WebsiteAboHero from '@/components/website-abo/WebsiteAboHero'
import WebsiteAboProblem from '@/components/website-abo/WebsiteAboProblem'
import WebsiteAboSolution from '@/components/website-abo/WebsiteAboSolution'
import WebsiteAboPricing from '@/components/website-abo/WebsiteAboPricing'
import WebsiteAboTestimonials from '@/components/website-abo/WebsiteAboTestimonials'
import WebsiteAboFAQ from '@/components/website-abo/WebsiteAboFAQ'
import WebsiteAboContact from '@/components/website-abo/WebsiteAboContact'
import WebsiteAboFooter from '@/components/website-abo/WebsiteAboFooter'

export default function WebsiteAboPage() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <WebsiteAboHero />
        
        {/* Problem Section */}
        <WebsiteAboProblem />
        
        {/* Solution Section */}
        <WebsiteAboSolution />
        
        {/* Pricing Section */}
        <WebsiteAboPricing />
        
        {/* Testimonials Section */}
        <WebsiteAboTestimonials />
        
        {/* FAQ Section */}
        <WebsiteAboFAQ />
        
        {/* Contact Section */}
        <WebsiteAboContact />
      </main>

      {/* Footer */}
      <WebsiteAboFooter />
    </>
  )
}
