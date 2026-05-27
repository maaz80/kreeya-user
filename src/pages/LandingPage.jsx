import { lazy, Suspense } from 'react'
import HeroSection from "../components/HeroSection"
import "../CSS/LandingPage.css"
import SeoTags from '../components/SeoTags';

const Navbar = lazy(() => import('../components/LandingPage/LandingNavbar'))
const CookieBanner = lazy(() => import('../components/CookieBanner'))
const LogoMarquee = lazy(() => import('../components/LogoMarque'))
const WhyKreeya = lazy(() => import('../components/LandingPage/WhyKreeya'))
const WorkShowcase = lazy(() => import('../components/LandingPage/WorkShowcase'))
const Form = lazy(() => import('../components/LandingPage/Form'))

const LandingPage = () => {
     return (
          <div className="poiret-one-regular">
               {/* <SeoTags
                    title="Landing Page Design Agency | Kreeya Design"
                    description="Kreeya Design creates conversion-driven landing pages with UI/UX design, branding, and development for businesses that want measurable growth."
                    keywords="landing page design, landing page development, conversion-driven landing page, UI UX landing page, digital marketing landing page"
                    canonical="https://kreeyadesign.com/landing-page"
               /> */}
               <Suspense fallback={null}>
                    <Navbar />
               </Suspense>
               <Suspense fallback={null}>
                    <CookieBanner />
               </Suspense>

               <div className="fixed inset-0 bg-white/90 md:bg-white/90 z-10" />

               <HeroSection />

               <div className="min-h-[30vh] lg:min-h-[82vh] relative"></div>
               <div className="hidden lg:block min-h-[47vh] lg:min-h-[52vh] xl:min-h-[65vh] min-[1500px]:min-h-[80vh] relative"></div>

               <Suspense fallback={<div className="min-h-screen" />}>
                    <LogoMarquee />
               </Suspense>
               <Suspense fallback={null}>
                    <WhyKreeya />
               </Suspense>
               <Suspense fallback={null}>
                    <WorkShowcase />
               </Suspense>
               <Suspense fallback={null}>
                    <Form />
               </Suspense>

          </div>
     )
}

export default LandingPage