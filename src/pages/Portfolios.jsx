import HomeNavbar from '../components/HomeNavbar'
import Breadcrumb from '../components/BreadCrumb'
import Hero from '../components/Portfolios/Hero'
import PortfolioSection from '../components/Portfolios/PortfolioSection'
import { lazy, Suspense } from 'react'

const YouMayLike = lazy(() => import('../components/YouMayLike'))
const FaqSection = lazy(() => import('../components/DynamicFaq'))
const defaultFaqs = [
     {
          question: "What services does Kreeya Design provide?",
          answer: "UI/UX design, branding, mobile app design, website design, wireframing, prototyping, social media creatives, and performance marketing design services are all provided by Kreeya Design."
     },
     {
          question: "Why should businesses choose Kreeya Design?",
          answer: "Before beginning a project, a professional portfolio enables organizations to comprehend the design quality, inventiveness, and knowledge provided by a design agency such as Kreeya Design."
     },
     {
          question: "Does Kreeya Design create custom UI/UX solutions?",
          answer: "Yes, Kreeya Design develops completely tailored UI/UX solutions in accordance with user requirements, corporate objectives, and industry standards."
     },
     {
          question: "Which industries are included in the Kreeya Design Portfolio?",
          answer: "Projects from eCommerce, finance, healthcare, real estate, education, and other startup areas are included in the Kreeya Design Portfolio."
     },
     {
          question: "How can I contact Kreeya Design?",
          answer: "You can contact Kreeya Design for UI/UX design, branding, and digital creative services through the official website or social media channels."
     },
 
];

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
                         <FaqSection faq={defaultFaqs}/>
                    </Suspense>
               </div>
          </div>
     )
}

export default Portfolios