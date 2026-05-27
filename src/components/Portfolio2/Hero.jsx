import ladi from '../../assets/daccord-bg.webp'
import ladiSmall from '../../assets/daccord-bg-small.webp'
import PortLogo from '../../assets/daccord-logo.webp'
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
                         <source media="(max-width: 768px)" srcSet={ladiSmall} />
                         <img
                              src={ladi}
                              alt="Daccord Bg"
                              fetchPriority="high"
                              loading="eager"
                              className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
                         />
                    </picture>
               </div>

               {/* Right Blue Gradient */}
               <div className="absolute inset-0 bg-linear-to-br from-dark-black via-dark-black/50  to-[#4B4CED]" />

               {/* Left Dotted Overlay */}
               {/* <img
                    src={showDots}
                    alt='background-sparkle-dots'
                    className="absolute left-0 bottom-0 pointer-events-none w-350"
               /> */}

               {/* Content */}
               <div className="relative z-10  px-3 md:px-15 2xl:px-22 mt-30 pb-18 md:mt-0 md:py-32 flex flex-col xl:flex-row justify-between items-start">

                    {/* Left */}
                    <div className="max-w-xl">
                         <div className='flex items-center gap-3'>
                              <img src={PortLogo} alt="Daccord Logo" className='w-19.25 md:w-35 xl:w-45.5 h-12.75 md:h-23 xl:h-30' />
                              <h1 className="text-[58px] md:text-[114px] xl:text-[124px] 3xl:text-[150px] italic font-extrabold poppins-regular tracking-tight">{h1Portfolio.main_heading || 'DACCORD'}</h1>
                         </div>

                         <p className="mt-0 xl:mt-8 text-[14px] md:text-[24px] leading-relaxed max-w-160 xl:max-w-100">
                              Daccord is a platform for creators to interact and engage with their audience and fans.
                         </p>
                    </div>

                    {/* Right Info */}
                    <div className="space-y-5 md:space-y-10 text-left mt-10">

                         <div className='border-b border-white/30 pb-5'>
                              <p className="text-light-gray text-[12px] md:text-[18px]">Industry</p>
                              <p className="text-[18px] md:text-[24px] font-bold">Digital Marketing</p>
                         </div>

                         <div className='border-b border-white/30 pb-5'>
                              <p className="text-light-gray text-[12px] md:text-[18px]">Platforms</p>
                              <CiMobile1 className='text-[18px] md:text-[24px] mt-1' />
                         </div>

                         <div className=''>
                              <p className="text-light-gray text-[12px] md:text-[18px]">Services</p>
                              <p className="text-[18px] md:text-[24px] font-bold">
                                   User Research | UX Design | Development
                              </p>
                         </div>

                    </div>

               </div>
          </div>
     )
}

export default Hero