import Portfolio from '../../assets/nectar-bg.webp'
import PortfolioMobile from '../../assets/nectar-bg-mobile.webp'
import PortLogo from '../../assets/nectar-logo.webp'
// import WhiteDotted from '../../assets/white-dotted.webp'
// import WhiteDottedMobile from '../../assets/white-dotted-mobile.webp'
import { CiMobile1 } from "react-icons/ci";
import { useH1Data } from '../../hooks/useH1Data';

const Hero = () => {
     const h1Portfolio = useH1Data()
     // const showDots = window.innerWidth < 786 ? WhiteDottedMobile : WhiteDotted;
     return (
          <div className='min-h-screen overflow-hidden text-white plus-jakarta-sans relative'>
               {/* Center Background Image */}
               <div className="absolute inset-0">
                    <picture>
                         <source media="(max-width: 768px)" srcSet={PortfolioMobile} />
                         <img
                              src={Portfolio}
                              alt="Nectar Bg"
                              loading="eager"
                              fetchPriority="high"
                              className="absolute inset-0 w-full h-full object-cover object-[50%_50%]"
                         />
                    </picture>
               </div>

               {/* Right Green Gradient */}
               <div className="absolute inset-0 bg-linear-to-b from-[#53B175] to-[#061D0E] opacity-50" />

               {/* Left Dotted Overlay */}
               {/* <img
                    src={showDots}
                    alt='background-sparkle-dots'
                    fetchPriority='high'
                    className="absolute left-0 bottom-0 pointer-events-none w-350"
               /> */}

               {/* Content */}
               <div className="relative z-10  px-3 md:px-15 2xl:px-32 mt-30 pb-18 md:mt-0 md:py-32 flex flex-col xl:flex-row justify-between items-start gap-30">

                    {/* Left */}
                    <div className="max-w-xl">
                         <div className='flex items-center gap-3'>
                              <img src={PortLogo} alt="Nectar Logo" className='w-19.25 md:w-35 xl:w-40.5 h-19.25 md:h-35 xl:h-40.5' />
                              <h1 className="text-[58px] md:text-[114px] xl:text-[124px] 3xl:text-[150px] italic font-extrabold poppins-regular tracking-tight">{h1Portfolio.main_heading || 'Nectar'}</h1>
                         </div>

                         <p className="mt-0 xl:mt-8 text-[14px] md:text-[24px] leading-relaxed max-w-160 xl:max-w-100">
                              Application for food insights, recipes, and delivery of fresh groceries
                         </p>
                    </div>

                    {/* Right Info */}
                    <div className="space-y-5 md:space-y-10 text-left mt-10">

                         <div className='border-b border-white/30 pb-5'>
                              <p className="text-light-gray text-[12px] md:text-[18px]">Industry</p>
                              <p className="text-[18px] md:text-[24px] font-bold">AI Insights & Grocery Delivery</p>
                         </div>

                         <div className='border-b border-white/30 pb-5'>
                              <p className="text-light-gray text-[12px] md:text-[18px]">Platforms</p>
                              <CiMobile1 className='text-[18px] md:text-[24px] mt-1' />
                         </div>

                         <div className=''>
                              <p className="text-light-gray text-[12px] md:text-[18px]">Services</p>
                              <p className="text-[18px] md:text-[24px] font-bold">
                                   User Research | UX Design | Development | AI Integration
                              </p>
                         </div>

                    </div>

               </div>
          </div>
     )
}

export default Hero