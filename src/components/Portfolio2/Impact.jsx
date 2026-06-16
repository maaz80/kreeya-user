import Dotted from '../../assets/dotted.webp';
import DottedMobile from '../../assets/Dotted-mobile.webp';
const ImpactCreated = () => {
     const impacts = [
          {
               value: "45%",
               title: "more discovery efficient",
               desc: "Increase community discovery efficiency by 45% through simplified categorization, recommended sections, and personalized content cards."
          },
          {
               value: "60%",
               title: "boost to onboarding completion",
               desc: "Boost new-user onboarding completion rate by 60 using clear navigation, contextual guidance, and intuitive sidebar structure."
          },
          {
               value: "35%",
               title: "more screen time",
               desc: "Improve time spent in platform by 35% with immersive visuals, quick-access interaction tools, and interactive community previews."
          },
          {
               value: "50%",
               title: "less navigation friction",
               desc: "Reduce the navigation friction by 50% thanks to a consolidated left navigation rail and clear right-panel user activity area."
          }
     ];

     return (

          <section className="for-white-icons relative  py-10 md:py-20 px-5 md:px-12 lg:px-20 overflow-hidden plus-jakarta-sans">
               {/* Left Dotted Overlay */}
               <picture className="absolute right-0 -top-10 md:-top-90 pointer-events-none">
                    <source media="(max-width: 785px)" srcSet={DottedMobile} />
                    <img
                         src={Dotted}
                         alt='Background Dots'
                         className="w-full h-full object-contain"
                    />
               </picture>

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