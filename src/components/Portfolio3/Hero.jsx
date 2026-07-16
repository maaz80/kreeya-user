import Portfolio from '../../assets/coinpay-bg.webp'
import PortfolioSmall from '../../assets/coinpay-bg-small.webp'
import PortLogo from '../../assets/beyekls-logo.webp'
// import WhiteDotted from '../../assets/white-dotted.webp'
// import WhiteDottedMobile from '../../assets/white-dotted-mobile.webp'
import { CiMobile1 } from "react-icons/ci";
import { BsLaptop } from "react-icons/bs";
import { useH1Data } from '../../hooks/useH1Data';
import { Link } from 'react-router-dom';
const Hero = () => {
     const h1Portfolio = useH1Data()
     // const showDots = window.innerWidth < 786 ? WhiteDottedMobile : WhiteDotted;

     return (
          <div className='min-h-screen overflow-hidden text-white plus-jakarta-sans relative'>
               {/* Center Background Image */}
               <div className="absolute inset-0">
                    <picture>
                         <source media="(max-width: 768px)" srcSet={PortfolioSmall} />
                         <img
                              src={Portfolio}
                              alt="Coinpay Logo"
                              fetchPriority="high"
                              loading="eager"
                              className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
                         />
                    </picture>
               </div>

               {/* Right Blue Gradient */}
               <div className="absolute inset-0 bg-linear-to-b from-[#2E46D0] to-[#18246A] mix-blend-multiply opacity-100" />

               {/* Left Dotted Overlay */}
               {/* <img
                    src={showDots}
                    alt='background-sparkle-dots'
                    fetchPriority='high'
                    className="absolute left-0 bottom-0 pointer-events-none w-350"
               /> */}

               {/* Content */}
               <div className="relative z-10  px-3 md:px-15 2xl:px-22 mt-30 pb-18 md:mt-10 md:py-32 flex flex-col xl:flex-row justify-between items-start">

                    {/* Left */}
                    <div className="max-w-xl">
                         <div className='flex items-center gap-3'>
                              <img src={PortLogo} alt="Coinpay Logo" className='w-19.25 md:w-35 xl:w-45.5 h-12.75 md:h-23 xl:h-30' />
                              <h1 className="text-[58px] md:text-[114px] xl:text-[124px] 3xl:text-[150px] italic font-extrabold poppins-regular tracking-tight">{h1Portfolio.main_heading || 'Coinpay'}</h1>
                         </div>

                         <p className="mt-0 xl:mt-8 text-[14px] md:text-[24px] leading-relaxed max-w-160 xl:max-w-100">
                              Coinpay is a Fintech mobile app focusing on clarity, ease of use and money management.
                         </p>
                    </div>

                    {/* Right Info */}
                    <div className="space-y-5 md:space-y-10 text-left mt-10">

                         <div className='border-b border-white/30 pb-5'>
                              <p className="text-light-gray text-[12px] md:text-[18px]">Industry</p>
                              <p className="text-[18px] md:text-[24px] font-bold">Banking & Finance</p>
                         </div>

                         <div className='border-b border-white/30 pb-5'>
                              <p className="text-light-gray text-[12px] md:text-[18px]">Platforms</p>
                              <div className="flex items-center gap-1">
                                   <CiMobile1 className='text-[18px] md:text-[24px] mt-1' />
                                   <BsLaptop className='text-[18px] md:text-[24px] mt-1' />
                              </div>
                         </div>

                         <div className=''>
                              <p className="text-light-gray text-[12px] md:text-[18px]">Services</p>
                              <p className="text-[18px] md:text-[24px] font-bold">
                                   <Link to="/product-design-service-in-delhi" className="inline-block transition-transform duration-300 hover:scale-102 origin-center">User Research</Link> | UX Design | Development
                              </p>
                         </div>

                    </div>

               </div>
          </div>
     )
}

export default Hero