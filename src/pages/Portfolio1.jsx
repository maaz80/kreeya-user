import { lazy, Suspense, useEffect } from 'react'
import Breadcrumb from '../components/BreadCrumb'
import Hero from '../components/Portfolio1/Hero';
// import SeoTags from '../components/SeoTags';

// const HomeNavbar = lazy(() => import('../components/HomeNavbar'))
const HomeNavbarV2 = lazy(() => import('../components/HomeNavbarV2'))
const ImpactCreated = lazy(() => import('../components/Portfolio1/Impact'))
const ProblemsSolved = lazy(() => import('../components/Portfolio1/ProblemSolved'))
const ProcessFollowed = lazy(() => import('../components/Portfolio1/ProcessFollowed'))
const ShowCase = lazy(() => import('../components/Portfolio1/ShowCase'))
const StyleGuide = lazy(() => import('../components/Portfolio1/StyleGuide'))

const Portfolio1 = () => {
     useEffect(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
     }, [])

     return (
          <section className="relative w-full bg-white">
               {/* <SeoTags
                    title="Buyekls Portfolio | UI/UX & Branding Case Study by Kreeya Design"
                    description="Explore the Buyekls case study by Kreeya Design, featuring user-centric UI/UX, identity branding, and polished digital product design."
                    keywords="Buyekls portfolio, UI UX case study, branding case study, product design portfolio, Kreeya Design portfolio"
                    canonical="https://kreeyadesign.com/portfolio-beyekls"
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
          </section>
     )
}

export default Portfolio1