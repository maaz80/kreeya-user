import { lazy, Suspense, useEffect } from 'react'
import Breadcrumb from '../components/BreadCrumb';
import SeoTags from '../components/SeoTags';

const HomeNavbar = lazy(() => import('../components/HomeNavbar'))
const Hero = lazy(() => import('../components/Portfolio4/Hero'))
const ProblemsSolved = lazy(() => import('../components/Portfolio4/ProblemSolved'))
const ShowCase = lazy(() => import('../components/Portfolio4/ShowCase'))
const ImpactCreated = lazy(() => import('../components/Portfolio4/Impact'))
const AiMagic = lazy(() => import('../components/Portfolio4/AiMagic'))
const AppFeatures = lazy(() => import('../components/Portfolio4/AppFeatures'))
const StyleGuide = lazy(() => import('../components/Portfolio4/StyleGuide'))

const Portfolio4 = () => {
     useEffect(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
     }, [])

     return (
          <div>
               {/* <SeoTags
                    title="Nectar Portfolio | Food Delivery App Design by Kreeya Design"
                    description="Explore the Nectar food delivery app portfolio by Kreeya Design, featuring intuitive UI/UX, mobile-first design, and a modern brand experience."
                    keywords="Nectar portfolio, food delivery app design, UI UX mobile app, restaurant app design, Kreeya Design portfolio"
                    canonical="https://kreeyadesign.com/portfolio-nectar"
               /> */}

               <Suspense fallback={null}>
                    <HomeNavbar />
               </Suspense>
               <Hero />
               <Suspense fallback={null}>
                    <div className="relative">
                         <Breadcrumb />
                    </div>
                    <ProblemsSolved />
                    <ShowCase />
                    <ImpactCreated />
                    <AiMagic />
                    <AppFeatures />
                    <StyleGuide />
               </Suspense>
          </div>
     )
}

export default Portfolio4