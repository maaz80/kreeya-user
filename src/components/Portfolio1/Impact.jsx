import Dotted from '../../assets/dotted.webp';

const ImpactCreated = () => {

     const impacts = [
          {
               value: "223%",
               title: "more leads",
               desc: "Researched for choke points and improved the site traffic by 223%, generating more leads"
          },
          {
               value: "223%",
               title: "more leads",
               desc: "Researched for choke points and improved the site traffic by 223%, generating more leads"
          },
          {
               value: "223%",
               title: "more leads",
               desc: "Researched for choke points and improved the site traffic by 223%, generating more leads"
          },
          {
               value: "223%",
               title: "more leads",
               desc: "Researched for choke points and improved the site traffic by 223%, generating more leads"
          }
     ];

     return (
          <section className="for-white-icons relative  py-10 md:py-20 px-5 md:px-12 lg:px-20 overflow-hidden plus-jakarta-sans">
               {/* Left Dotted Overlay */}
               <img
                    src={Dotted}
                    alt='Background Dots'
                    className="absolute right-0 -top-10 md:-top-90 pointer-events-none w-[50%] md:w-full hidden md:blocked"
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