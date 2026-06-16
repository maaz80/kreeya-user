import { useEffect, useRef } from 'react';
import Dotted from '../../assets/wire.webp';
import DottedMobile from '../../assets/wire-mobile.webp';
import coinpayMobile from '../../assets/coinpay-artifact.webp'
import coinpayMobileSmall from '../../assets/coinpay-artifact-small.webp'
import sitemap from '../../assets/sitemap.webp'
import sitemapSmall from '../../assets/sitemap-small.webp'
import BG from '../../assets/bg.webp'
import { initGSAP } from '../../utils/gsapLoader';

const processSteps = [
     {
          id: "01",
          title: "Minimal Dashboard with Clear Priorities",
          changed: "Balance at the top for instant clarity, Only essential cards visible, Soft color palette to reduce anxiety.",
          impact: "35% faster comprehension of monthly spending."
     },
     {
          id: "02",
          title: "Quick Action Bar (Send, Pay, Request)",
          changed: "Anchored at the bottom for thumb reach, One-tap transitions.",
          impact: "Payments completed 28% faster during testing."
     },
     {
          id: "03",
          title: "Smart Spending Categories",
          changed: "Easy color coding, Simple icons, Clean donut visuals.",
          impact: "Users understood spending patterns without reading graphs."
     },
     {
          id: "04",
          title: "Personalized Insights",
          changed: "Weekly summaries, “You spent more on X this month” alerts, Goal-based suggestions.",
          impact: "Higher re-engagement and app trust."
     },
     {
          id: "05",
          title: "Decluttered Transaction List",
          changed: "Clear typography, Large spacing, Instant filters.",
          impact: "Reduced the effort needed to find past transactions."
     },
];

const ProcessFollowed = () => {
     const chatPreviewRef = useRef(null);
     const chatPreviewSectionRef = useRef(null);
     //  Updated version
     useEffect(() => {
          let scrollTriggerInstance = null;

          const initAnimation = async () => {
               const { gsap } = await initGSAP();

               const animation = gsap.fromTo(
                    chatPreviewRef.current,
                    { y: 200, opacity: 0 },
                    {
                         y: 0,
                         opacity: 1,
                         duration: 1,
                         ease: "power3.out",
                         scrollTrigger: {
                              trigger: chatPreviewSectionRef.current,
                              start: "top 70%",
                              toggleActions: "play none none reverse",
                         },
                    }
               );

               scrollTriggerInstance = animation.scrollTrigger;
          };

          initAnimation();

          return () => {
               scrollTriggerInstance?.kill();
          };
     }, []);

     return (
          <section className="relative text-white  overflow-hidden plus-jakarta-sans">
               <img
                    src={BG}
                    alt='Background'
                    className="absolute inset-0 w-full h-full object-cover z-10"
               />

               <div className="absolute inset-0 bg-linear-to-r from-[#304FFF] to-[#000B43] mix-blend-multiply opacity-100 z-10" />
               {/* Left Dotted Overlay */}
               <picture className="absolute right-0 top-0 pointer-events-none">
                    <source media="(max-width: 785px)" srcSet={DottedMobile} />
                    <img
                         src={Dotted}
                         alt='Background Dots'
                         className="w-full h-full object-contain"
                    />
               </picture>

               <div className=" relative max-w-7xl mx-auto py-10 md:py-20 lg:py-25 px-3 md:px-15 lg:px-20 z-999">

                    {/* Heading */}
                    <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                         The Design Decisions
                    </h2>

                    {/* Steps */}
                    <div className="space-y-10 md:space-y-20">

                         {processSteps.map((step, index) => (

                              <div
                                   key={step.id}
                                   className={`flex flex-col md:flex-row gap-5 md:gap-10
              ${index % 2 === 1 ? "md:flex-row-reverse text-right items-end md:items-center" : "items-start md:items-center"}`}
                              >

                                   {/* Hex Number */}
                                   <div className="shrink-0">
                                        <div
                                             className="w-20 md:w-22 h-20 md:h-22 flex items-center justify-center 
    text-[#0b4a6b] text-[48px] poppins-regular font-extrabold"
                                             style={{
                                                  clipPath:
                                                       "polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)",
                                                  background: "linear-gradient(145deg,#ffffff,#e9eef2)",
                                                  boxShadow:
                                                       "inset 0 6px 10px rgba(255,255,255,1.9), inset 0 -6px 10px rgba(0,0,0,0.55), 0 14px 20px rgba(0,0,0,0.55)"
                                             }}
                                        >
                                             {step.id}
                                        </div>
                                   </div>

                                   {/* Text */}
                                   <div className={`max-w-200 lg:max-w-250 px-3  flex flex-col ${index % 2 === 1 ? 'items-end' : 'items-start'} `}>

                                        <h3 className="text-[36px] text-white/50 leading-12 poiret-one-regular">
                                             {step.title}
                                        </h3>

                                        <div className="flex">
                                             {index % 2 !== 1 && (
                                                  <span className="min-w-20 md:min-w-26 font-bold text-[14px] md:text-[18px]">
                                                       CHANGED:
                                                  </span>
                                             )}
                                             <span className="text-[14px] md:text-[18px]">
                                                  {step.changed}
                                             </span>
                                             {index % 2 === 1 && (
                                                  <span className="min-w-20 md:min-w-26 font-bold text-[14px] md:text-[18px]">
                                                       :CHANGED
                                                  </span>
                                             )}
                                        </div>

                                        <div className="flex">
                                             {index % 2 !== 1 && (
                                                  <span className="min-w-15.5 md:min-w-20 font-bold text-[14px] md:text-[18px]">
                                                       IMPACT:
                                                  </span>
                                             )}
                                             <span className="text-[14px] md:text-[18px]">
                                                  {step.impact}
                                             </span>
                                             {index % 2 === 1 && (
                                                  <span className="min-w-15.5 md:min-w-20 font-bold text-[14px] md:text-[18px]">
                                                       :IMPACT
                                                  </span>
                                             )}
                                        </div>
                                        <div className="h-px bg-white/10 mt-6" />
                                   </div>

                              </div>

                         ))}

                    </div>

               </div>

               <div className="relative z-50">
                    <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                         The Sitemap
                    </h2>
                    <picture>
                         <source media="(max-width: 785px)" srcSet={sitemapSmall} />
                         <img src={sitemap} alt="Sitemap" className='w-170 h-50 sm:h-90 lg:w-240 lg:h-110 2xl:w-321 2xl:h-170 mx-auto' />
                    </picture>
               </div>
               <div ref={chatPreviewSectionRef} className="relative min-h-[53vh] md:min-h-[145vh] lg:min-h-[221vh] z-50">
                    {/* Mobile Image  */}
                    <picture ref={chatPreviewRef} className="absolute left-0 w-full top-5 pointer-events-none">
                         <source media="(max-width: 785px)" srcSet={showCoinpayMobile} />
                         <img
                              src={coinpayMobile}
                              alt="Coinpay Artifact"
                              className="w-full h-full object-contain"
                         />
                    </picture>
                    <div className='bg-linear-to-r from-[#304FFF]/50 to-[#000B43]/50 backdrop-blur-2xl text-white text-[36px] md:text-[56px] lg:text-[72px] w-67 md:w-105.75 lg:w-xl absolute top-1/2 left-1/2 -translate-1/2 poiret-one-regular text-center rounded-xl px-4 py-6 md:px-8 md:py-10 lg:px-15 lg:py-20 leading-12 md:leading-15 lg:leading-21'>
                         The Experience We Created
                    </div>
               </div>
          </section>
     );
};

export default ProcessFollowed;