import Mobile from "../../assets/nectar-ai.webp";
import MobileSmall from "../../assets/nectar-ai-small.webp";
import Icon1 from "../../assets/nectar-ai-icon-1.webp";
import Icon2 from "../../assets/nectar-ai-icon-2.webp";
import Icon3 from "../../assets/nectar-ai-icon-3.webp";
import Icon4 from "../../assets/nectar-ai-icon-4.webp";
import Icon5 from "../../assets/nectar-ai-icon-5.webp";
import Icon6 from "../../assets/nectar-ai-icon-6.webp";
import Dotted from '../../assets/dotted.webp';
import DottedMobile from '../../assets/Dotted-mobile.webp';

const features = [
     {
          icon: Icon1,
          color: 'bg-orange-100',
          title: "Smart Recipe Generator",
          desc: "Instantly creates personalized recipes based on the ingredients scanned or listed by you, adapting to dietary preferences, time limits, and skill levels."
     },
     {
          icon: Icon2,
          color: 'bg-green-100',
          title: "AI Freshness Scanner",
          desc: "Uses the phone camera to analyze color, texture, and surface patterns to determine whether fruits, vegetables, or packaged foods are fresh, borderline, or stale."
     },
     {
          icon: Icon3,
          color: 'bg-orange-100',
          title: "Predictive Meal Suggestions",
          desc: "Learns user behavior over time to recommend meals at the right time of day, aligned with nutrition goals and cooking habits."
     },
     {
          icon: Icon4,
          color: 'bg-purple-100',
          title: "AI Grocery Auto-Replacement",
          desc: "Automatically detects defective or incorrect deliveries using uploaded photos or quick scans and initiates a replacement with minimal user interaction."
     },
     {
          icon: Icon5,
          color: 'bg-yellow-100',
          title: "Calorie & Nutrition Analyzer",
          desc: "Estimates nutritional values of scanned ingredients and generated recipes, helping users maintain healthier eating habits."
     },
     {
          icon: Icon6,
          color: 'bg-blue-100',
          title: "Voice & Chat Food Assistant",
          desc: "A natural-language interface that allows users to ask for recipes, check food condition, plan meals, or reorder groceries conversationally."
     }
];

const AiMagic = () => {
     return (
          <section className="bg-[#f7f7f7] py-16 md:py-10 relative plus-jakarta-sans">
               <picture className="absolute -top-10 md:-top-50 right-0 pointer-events-none">
                    <source media="(max-width: 785px)" srcSet={DottedMobile} />
                    <img
                         src={Dotted}
                         alt='Background- Dots'
                         className="w-full h-full object-contain"
                    />
               </picture>
               {/* Heading */}
               <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                    The AI Magic
               </h2>

               <div className="max-w-350 mx-auto px-4 md:px-10 flex flex-col-reverse lg:flex-row justify-between gap-12 items-center ">

                    {/* LEFT FEATURES */}
                    <div className="space-y-6 w-full lg:w-[50%]">

                         {features.map((item, i) => (

                              <div
                                   key={i}
                                   className={`flex flex-col lg:flex-row items-start lg:items-center justify-center gap-4 p-6 rounded-xl bg-white shadow-sm border border-[#e5e5e5] max-w-140 relative z-50
              
              ${i % 2 === 1 ? "ml-auto" : "mr-auto"}
              
              `}
                              >

                                   {/* Icon */}
                                   <div className={`w-20 h-20 flex items-center justify-center rounded-full ${item.color} shrink-0`}>
                                        <img src={item.icon} className="w-10 h-10" alt={`${item.title} Icon`}/>
                                   </div>

                                   {/* Text */}
                                   <div>

                                        <h3 className="text-[18px] md:text-[24px] leading-8 text-[#07484D]">
                                             {item.title}
                                        </h3>

                                        <p className="text-[14px] md:text-[16px] leading-6 text-[#07484D] mt-1">
                                             {item.desc}
                                        </p>

                                   </div>

                              </div>

                         ))}

                    </div>


                    {/* RIGHT MOBILE MOCKUP */}
                    <div className="flex justify-center lg:justify-end relative z-50">

                         <picture>
                              <source media="(max-width: 785px)" srcSet={MobileSmall} />
                              <img
                                   src={Mobile}
                                   alt="Nectar Ai"
                                   className="w-100 h-210 2xl:w-140 2xl:h-300"
                              />
                         </picture>

                    </div>

               </div>

          </section>
     );
};

export default AiMagic;