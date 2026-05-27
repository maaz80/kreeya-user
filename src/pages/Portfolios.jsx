import HomeNavbar from '../components/HomeNavbar'
import Breadcrumb from '../components/BreadCrumb'
import Hero from '../components/Portfolios/Hero'
import PortfolioSection from '../components/Portfolios/PortfolioSection'
import { lazy, Suspense } from 'react'

const YouMayLike = lazy(() => import('../components/YouMayLike'))
const FaqSection = lazy(() => import('../components/About/Faq'))

const Portfolios = () => {
     return (
          <div className=''>
               <HomeNavbar />
               <Breadcrumb />
               <Hero />
               <PortfolioSection />
               <div className="max-w-325 mx-auto px-2 md:px-0">
                    <Suspense fallback={null}>
                         <YouMayLike />
                    </Suspense>
               </div>

               <div className="py-24 max-w-325 mx-auto px-2 md:px-0">
                    <Suspense fallback={<div className="min-h-75" />}>
                         <FaqSection />
                    </Suspense>
               </div>
          </div>
     )
}

export default Portfolios