import CTA from '../../components/landing/CTA/CTA'
import DashboardPreview from '../../components/landing/DashboardPreview/DashboardPreview'
import Features from '../../components/landing/Features/Features'
import Footer from '../../components/landing/Footer/Footer'
import Hero from '../../components/landing/Hero/Hero'
import Navbar from '../../components/landing/Navbar/Navbar'
import Statistics from '../../components/landing/Statistics/Statistics'
import Testimonials from '../../components/landing/Testimonials/Testimonials'
import TrustedCompanies from '../../components/landing/TrustedCompanies/TrustedCompanies'
import WhyChooseUs from '../../components/landing/WhyChooseUs/WhyChooseUs'
import Workflow from '../../components/landing/Workflow/Workflow'

const LandingPage = () => {
	return (
		<div className="bg-white text-slate-900">
			<Navbar />
			<main>
				<Hero />
				<TrustedCompanies />
				<Features />
				<DashboardPreview />
				<Statistics />
				<WhyChooseUs />
				<Workflow />
				<Testimonials />
				<CTA />
			</main>
			<Footer />
		</div>
	)
}

export default LandingPage
