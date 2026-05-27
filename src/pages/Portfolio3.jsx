import { lazy, Suspense, useEffect } from 'react'
import Breadcrumb from '../components/BreadCrumb';
import Hero from '../components/Portfolio3/Hero';
import SeoTags from '../components/SeoTags';
const HomeNavbar = lazy(() => import('../components/HomeNavbar'))
const ProblemsSolved = lazy(() => import('../components/Portfolio3/ProblemSolved'))
const ShowCase = lazy(() => import('../components/Portfolio3/ShowCase'))
const ImpactCreated = lazy(() => import('../components/Portfolio3/Impact'))
const ProcessFollowed = lazy(() => import('../components/Portfolio3/ProcessFollowed'))
const StyleGuide = lazy(() => import('../components/Portfolio3/StyleGuide'))

const Portfolio3 = () => {
     useEffect(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
     }, [])

     return (
          <div>
               {/* <SeoTags
                    title="Coinpay Portfolio | Fintech UI/UX & App Design by Kreeya Design"
                    description="View the Coinpay fintech app portfolio from Kreeya Design, showcasing secure UI/UX, payment flows, and high-conversion design systems."
                    keywords="Coinpay portfolio, fintech app design, UI UX finance, payment app design, Kreeya Design case study"
                    canonical="https://kreeyadesign.com/portfolio-coinpay"
               /> */}

               <Suspense fallback={null}>
                    <HomeNavbar />
               </Suspense>

               <Hero />
               <Suspense fallback={null}>
                    <div className="relative">
                         <Breadcrumb />
                    </div>
               </Suspense>
               <Suspense fallback={null}>
                    <ProblemsSolved />
               </Suspense>
               <Suspense fallback={null}>
                    <ShowCase />
               </Suspense>
               <Suspense fallback={null}>
                    <ImpactCreated />
               </Suspense>
               <Suspense fallback={null}>
                    <ProcessFollowed />
               </Suspense>
               <Suspense fallback={null}>
                    <StyleGuide />
               </Suspense>
          </div>
     )
}

export default Portfolio3