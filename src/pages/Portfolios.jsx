import { useEffect, useState, useMemo, lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { getPortfolios } from '../utils/portfolio'
import HomeNavbar from '../components/HomeNavbar'
import Breadcrumb from '../components/BreadCrumb'
import Hero from '../components/Portfolios/Hero'
import PortfolioSection from '../components/Portfolios/PortfolioSection'
import staticPortfolios from '../data/staticPortfolios.json'
import { Helmet } from 'react-helmet-async'

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
     const { itemSlug } = useParams();
     const [portfolios, setPortfolios] = useState(staticPortfolios || []);
     const [loading, setLoading] = useState(staticPortfolios.length === 0);

     useEffect(() => {
          const loadPortfoliosData = async () => {
               try {
                    const data = await getPortfolios();
                    setPortfolios(data);
               } catch (err) {
                    console.error("Error loading portfolios in parent page:", err);
               } finally {
                    setLoading(false);
               }
          };
          loadPortfoliosData();
     }, []);

     const activePortfolio = useMemo(() => {
          if (!itemSlug || portfolios.length === 0) return null;
          return portfolios.find(
               (p) => p.name.toLowerCase().replace(/\s+/g, '-') === itemSlug
          ) || null;
     }, [itemSlug, portfolios]);

     const faqs = useMemo(() => {
          if (activePortfolio?.faq && activePortfolio.faq.length > 0) {
               return activePortfolio.faq.map((f) => ({
                    question: f.ques || "",
                    answer: f.ans || "",
               }));
          }
          return defaultFaqs;
     }, [activePortfolio]);

     return (
          <div className=''>
               <Helmet>
                    <link
                         rel="preload"
                         as="image"
                         href='/Build-your-first-ai-agent-in-15-no-coding.webp'
                         fetchpriority="high"
                    />
               </Helmet>
               <HomeNavbar />
               <Breadcrumb />
               <Hero title={activePortfolio?.title} description={activePortfolio?.description} />
               <PortfolioSection portfolios={portfolios} loading={loading} />
               <div className="max-w-325 mx-auto px-2 md:px-0">
                    <Suspense fallback={null}>
                         <YouMayLike />
                    </Suspense>
               </div>

               <div className="py-24 max-w-325 mx-auto px-2 md:px-0">
                    <Suspense fallback={<div className="min-h-75" />}>
                         <FaqSection faq={faqs} />
                    </Suspense>
               </div>
          </div>
     )
}

export default Portfolios;