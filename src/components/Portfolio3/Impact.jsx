import Dotted from '../../assets/dotted.webp';
import DottedMobile from '../../assets/Dotted-mobile.webp';

const ImpactCreated = () => {
     const showDots = window.innerWidth < 786 ? DottedMobile : Dotted;

     const impacts = [
          {
               value: "30%",
               title: "less search time loss",
               desc: "30% reduction in time to find key functions (transactions, wallet, payments)."
          },
          {
               value: "40%",
               title: "boost to onboarding completion",
               desc: "40% increase in user task completion during onboarding."
          },
          {
               value: "50%",
               title: "more visual clarity",
               desc: "50% improvement in visual clarity via decluttered UI and structured flow."
          },
          {
               value: "25%",
               title: "higher retention",
               desc: "25% higher retention after 30 days with personal insights and reminders."
          }
     ];

     return (
          <section className="for-white-icons relative  py-10 md:py-20 px-5 md:px-12 lg:px-20 overflow-hidden plus-jakarta-sans">
               {/* Left Dotted Overlay */}
               <img
                    src={showDots}
                    alt='Background Dots'
                    className="absolute right-0 -top-10 md:-top-90 pointer-events-none "
               />

               <div className="max-w-300 3xl:max-w-400 mx-auto">

                    {/* Heading */}
                    <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                         The Impact We Created
                    </h2>

                    {/* Grid */}
                    <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">

                         {impacts.map((item, i) => (

                              <div
                                   key={i}
                                   className="bg-[#000000]/4 backdrop-blur-sm border border-[#dddddd] py-10 px-4 md:px-10 text-center"
                              >

                                   {/* Value */}
                                   <h3 className="text-[36px] font-bold text-[#1a1a1a]">
                                        {item.value}
                                   </h3>

                                   {/* Title */}
                                   <p className="text-[16px] md:text-[18px] lg:text-[24px] text-medium text-[#1a1a1a] mt-1">
                                        {item.title}
                                   </p>

                                   {/* Divider */}
                                   <div className="h-px bg-[#d6d6d6] my-3 md:my-6 w-full" />

                                   {/* Description */}
                                   <p className="text-[14px] md:text-[18px] lg:text-[20px] text-dark-gray leading-relaxed mx-auto">
                                        {item.desc}
                                   </p>

                              </div>

                         ))}

                    </div>

               </div>

          </section>
     );
};

export default ImpactCreated;