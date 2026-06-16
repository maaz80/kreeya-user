import { useEffect, useRef } from 'react';
import Dotted from '../../assets/wire.webp';
import DottedMobile from '../../assets/wire-mobile.webp';
import chatPreview from '../../assets/daccord-wireframe.webp'
import chatPreviewSmall from '../../assets/daccord-wireframes-small.webp'
import { initGSAP } from '../../utils/gsapLoader';


const processSteps = [
     {
          id: "01",
          title: "Categorized Left Navigation Panel",
          problem_solved: "Users often get lost when jumping between multiple community types.",
          impact: "Clear category grouping helps users explore faster, reducing decision fatigue."
     },
     {
          id: "02",
          title: "Right-Side User Activity Panel (New Members + Social Links)",
          problem_solved: "Community feels disconnected; new members remain unnoticed.",
          impact: "Immediate visibility of new members improves welcome interactions and boosts user retention."
     },
     {
          id: "03",
          title: "Featured & Popular Community Cards With Visual Hierarchy",
          problem_solved: "New users struggle to find high-value communities quickly.",
          impact: "Highlighting VR, Gaming, NFT, etc. improves visibility of active spaces, increasing engagement and join rates."
     },
     {
          id: "04",
          title: "Personal Media Bar With Voice Input & Quick Actions",
          problem_solved: "Communication tools are hidden or require multiple clicks.",
          impact: "Instant voice activation and utility shortcuts reduce interaction time and increase platform usage."
     }
];

const ProcessFollowed = () => {
     const chatPreviewRef = useRef(null);
     const chatPreviewSectionRef = useRef(null);
     //   Updated version
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
          <section className="relative bg-linear-to-bl from-[#7758D1] via-[#B791E7] to-[#01DAEA] text-white  overflow-hidden plus-jakarta-sans">

               {/* Left Dotted Overlay */}
               <picture className="absolute right-0 top-0 pointer-events-none">
                    <source media="(max-width: 785px)" srcSet={DottedMobile} />
                    <img
                         src={Dotted}
                         alt='Background Dots'
                         className="w-full h-full object-contain"
                    />
               </picture>


               <div className="max-w-7xl mx-auto py-10 md:py-20 lg:py-25 px-3 md:px-15 lg:px-20">

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
                                   <div className={`max-w-200 lg:max-w-250 flex flex-col ${index % 2 === 1 ? 'items-end' : 'items-start'} `}>

                                        <h3 className="text-[36px] text-white/50 leading-12 poiret-one-regular">
                                             {step.title}
                                        </h3>

                                        <div className="flex">
                                             {index % 2 !== 1 && (
                                                  <span className="min-w-15 md:min-w-36.75 font-bold text-[14px] md:text-[18px]">
                                                       Problem Solved:
                                                  </span>
                                             )}
                                             <span className="text-[14px] md:text-[18px]">
                                                  {step.problem_solved}
                                             </span>
                                             {index % 2 === 1 && (
                                                  <span className="min-w-15 md:min-w-36.75 font-bold text-[14px] md:text-[18px]">
                                                       :Problem Solved
                                                  </span>
                                             )}
                                        </div>

                                        <div className="flex">
                                             {index % 2 !== 1 && (
                                                  <span className="min-w-14.5 md:min-w-18 font-bold text-[14px] md:text-[18px]">
                                                       Impact:
                                                  </span>
                                             )}
                                             <span className="text-[14px] md:text-[18px]">
                                                  {step.impact}
                                             </span>
                                             {index % 2 === 1 && (
                                                  <span className="min-w-14.5 md:min-w-18 font-bold text-[14px] md:text-[18px]">
                                                       :Impact
                                                  </span>
                                             )}
                                        </div>
                                        <div className="h-px bg-white/10 mt-6" />
                                    </div>

                              </div>

                         ))}

                    </div>

               </div>


               <div ref={chatPreviewSectionRef} className="relative min-h-[43vh] md:min-h-[50vh] lg:min-h-[155vh]">
                    {/* Mobile Image  */}
                    <picture ref={chatPreviewRef} className="absolute left-0 w-full scale-120 md:scale-100 top-5 pointer-events-none">
                         <source media="(max-width: 785px)" srcSet={chatPreviewSmall} />
                         <img
                              src={chatPreview}
                              alt="Daccord Wireframe"
                              className="w-full h-full object-contain"
                         />
                    </picture>
                    <div className='bg-linear-to-b from-[#7758D1]  to-[#B791E7] text-white text-[36px] md:text-[56px] lg:text-[72px] w-67 md:w-105.75 lg:w-xl absolute top-1/2 left-1/2 -translate-1/2 poiret-one-regular text-center rounded-xl px-4 py-6 md:px-8 md:py-10 lg:px-15 lg:py-20 leading-12 md:leading-15 lg:leading-21'>
                         The Experience We Created
                    </div>
               </div>
          </section>
     );
};

export default ProcessFollowed;