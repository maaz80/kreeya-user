import { lazy, Suspense, useEffect } from 'react'
import Breadcrumb from '../components/BreadCrumb';
import Hero from '../components/Portfolio2/Hero';
import SeoTags from '../components/SeoTags';
// const HomeNavbar = lazy(() => import('../components/HomeNavbar'))
const HomeNavbarV2 = lazy(() => import('../components/HomeNavbarV2'))
const ProblemsSolved = lazy(() => import('../components/Portfolio2/ProblemSolved'))
const ShowCase = lazy(() => import('../components/Portfolio2/ShowCase'))
const ImpactCreated = lazy(() => import('../components/Portfolio2/Impact'))
const ProcessFollowed = lazy(() => import('../components/Portfolio2/ProcessFollowed'))
const StyleGuide = lazy(() => import('../components/Portfolio2/StyleGuide'))

const Portfolio2 = () => {
     useEffect(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
     }, [])

     return (
          <div>
               {/* <SeoTags
                    title="Daccord Portfolio | Ecommerce UI/UX & Branding by Kreeya Design"
                    description="Discover Daccord's ecommerce project with Kreeya Design, featuring modern UI/UX, brand storytelling, and seamless shopping experiences."
                    keywords="Daccord portfolio, ecommerce design, UI UX ecommerce, branding design, Kreeya Design case study"
                    canonical="https://kreeyadesign.com/portfolio-daccord"
               /> */}

               <Suspense fallback={null}>
                    {/* <HomeNavbar /> */}
                    <HomeNavbarV2 />
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

export default Portfolio2