import { lazy, Suspense } from 'react'
// import HomeNavbar from '../components/HomeNavbar'
import HomeNavbarV2 from '../components/HomeNavbarV2'
import Breadcrumb from '../components/BreadCrumb'
import Details from '../components/About/Details'
import Hero from '../components/About/Hero'
import Youtube from '../components/About/Youtube'
import useFaq from '../hooks/useFaq'

const YouMayLike = lazy(() => import('../components/YouMayLike'))
const FaqSection = lazy(() => import('../components/FaqSection'))

const About = () => {
     const { faqData } = useFaq();

     return (
          <div>
               {/* <HomeNavbar /> */}
               <HomeNavbarV2 />
               <Breadcrumb />
               <Hero/>
               <Youtube/>
               {/* <Details /> */}
               <div className='relative max-w-340 mx-auto plus-jakarta-sans flex flex-col justify-center items-center px-4 mt-15'>
                    <Suspense fallback={null}>
                         <YouMayLike />
                    </Suspense>

                    <div className="py-24">
                         <Suspense fallback={<div className="min-h-75" />}>
                              <FaqSection faqData={faqData} />
                         </Suspense>
                    </div>
               </div>

          </div>
     )
}

export default About
