import { useEffect, useRef } from 'react';
import Dotted from '../../assets/wire.webp';
import DottedMobile from '../../assets/wire-mobile.webp';
import Mobiles from '../../assets/beyekls-wireframes.webp'
import MobilesForMobile from '../../assets/beyekls-wireframes-mobile.webp'
import { initGSAP, loadGSAP } from '../../utils/gsapLoader';

const processSteps = [
     {
          id: "01",
          title: "What’s not working",
          desc: "After getting the brief start auditing the current social medias to analyze what all are not creating impact or creating a negative impact"
     },
     {
          id: "02",
          title: "Behavior Pattern",
          desc: "After analyzing all current issues, we then start identifying social media current algorithms and patterns, and how they are best applied to our target user group"
     },
     {
          id: "03",
          title: "Strategize, Analyze",
          desc: "After getting the data we strategize on how to maximize the results, and form various plan to applies and tested."
     },
     {
          id: "04",
          title: "Repeat",
          desc: "The user behavior is volatile and keeps changing, and thus so does social media patterns and algorithms."
     }
];

const ProcessFollowed = () => {
     const mobileRef = useRef(null);
     const mobileSectionRef = useRef(null);
     const showImageMobiles = window.innerWidth < 786 ? MobilesForMobile : Mobiles;
     const showDots = window.innerWidth < 786 ? DottedMobile : Dotted;

     useEffect(() => {
          let scrollTriggerInstance = null;

          const initAnimation = async () => {
               const { gsap } = await initGSAP();

               const animation = gsap.fromTo(
                    mobileRef.current,
                    { y: 200, opacity: 0 },
                    {
                         y: 0,
                         opacity: 1,
                         duration: 1,
                         ease: "power3.out",
                         scrollTrigger: {
                              trigger: mobileSectionRef.current,
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
          <section className="relative bg-linear-to-b from-[#003D64] via-[#007CC9] to-[#003D64] text-white  overflow-hidden plus-jakarta-sans">

               {/* Left Dotted Overlay */}
               <img
                    src={showDots}
                    alt='Background Dots'
                    className="absolute right-0 top-0 pointer-events-none "
               />
               {/* grain texture */}


               <div className="max-w-7xl mx-auto py-10 md:py-20 lg:py-25 px-3 md:px-15 lg:px-20">

                    {/* Heading */}
                    <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                         The Process We Followed
                    </h2>

                    {/* Steps */}
                    <div className="space-y-10 md:space-y-20">

                         {processSteps.map((step, index) => (

                              <div
                                   key={step.id}
                                   className={`flex flex-col md:flex-row   gap-5 md:gap-10
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
                                   <div className="max-w-120 lg:max-w-175">

                                        <h3 className="text-[36px] text-white/50 leading-12 poiret-one-regular">
                                             {step.title}
                                        </h3>

                                        <p className="text-[14px] md:text-[18px] mt-2">
                                             {step.desc}
                                        </p>

                                        <div className="h-px bg-white/10 mt-6" />
                                   </div>

                              </div>

                         ))}

                    </div>

               </div>


               <div ref={mobileSectionRef} className="relative min-h-[43vh] md:min-h-[50vh] lg:min-h-[165vh]">
                    {/* Mobile Image  */}
                    <img
                         ref={mobileRef}
                         src={showImageMobiles}
                         alt="Beyekls Wireframes"
                         className="absolute left-0 w-full scale-120 md:scale-100 -top-5 md:-top-25 lg:-top-30 pointer-events-none"
                    />
                    <div className='bg-linear-to-b from-[#003D64] via-[#007CC9] to-[#003D64] text-white text-[36px] md:text-[56px] lg:text-[72px] w-67 md:w-105.75 lg:w-xl absolute top-1/2 left-1/2 -translate-1/2 poiret-one-regular text-center rounded-xl px-4 py-6 md:px-8 md:py-10 lg:px-15 lg:py-20 leading-12 md:leading-15 lg:leading-21'>
                         The Experience We Created
                    </div>
               </div>
          </section>
     );
};

export default ProcessFollowed;