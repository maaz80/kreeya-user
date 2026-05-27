import { useEffect, useRef, useState } from 'react';
import Dotted from '../../assets/wire.webp';
import DottedMobile from '../../assets/wire-mobile.webp';
import Mobiles from '../../assets/nectar-wireframe.webp'
import MobilesSmall from '../../assets/nectar-wireframe-small.webp'
import { IoRocketSharp } from 'react-icons/io5';
import { PiFoldersFill } from "react-icons/pi";
import { BsFillBoxFill, BsHourglassBottom } from "react-icons/bs";
import { IoFastFoodOutline } from "react-icons/io5";
import Preview from '../../assets/userflow.webp'

const processSteps = [
     {
          id: "01",
          icons: <PiFoldersFill />,
          title: "Pantry Organization by food categories",
          desc: "Users can group food items into clear categories like Fruits & Vegetables, Dairy & Eggs, Meats & Seafood, Grains & Pasta, Snacks & Sweets, and Condiments & Spices. This categorization helps maintain an organized inventory that is easy to navigate."
     },
     {
          id: "02",
          icons: <BsHourglassBottom />,
          title: "Freshness tracking with smart alerts",
          desc: "The app includes freshness countdown timers to monitor food quality. Expiration alerts notify users to use items before they spoil. Suggested use-by recipes encourage timely consumption of perishable goods. Custom reminders allow users to personalize notifications about their pantry items."
     },
     {
          id: "03",
          icons: <IoRocketSharp />,
          title: "Onboarding flow essentials for user start",
          desc: "he onboarding process focuses on key screens such as welcome screens, login/signup options, and permission requests. It captures personal preferences and guides users through kitchen setup steps. Additional onboarding considerations ensure a smooth and engaging user introduction within approximately 10 minutes."
     },
     {
          id: "04",
          icons: <IoFastFoodOutline />,
          title: "Recipe exploration and meal planning tools",
          desc: "Users can find and customize recipes based on their inventory with AI-generated suggestions. The app supports searching recipes by ingredients or cuisine and includes dietary filters like vegan or gluten-free. Features include AI chat for quick recipe ideas, shopping list creation, and meal planning calendar integration."
     },
     {
          id: "05",
          icons: <BsFillBoxFill />,
          title: "Grocery delivery and AI support features",
          desc: "The app facilitates browsing grocery categories and quick addition of items to the cart. Suggested bundles for meal kits and the ability to buy missing recipe ingredients enhance convenience.Real - time order tracking and AI- powered customer support chat improve the overall user experience.The home dashboard integrates key actions such as scanning food quality, accessing favorite items, placing quick orders, and using AI voice or chat support."
     }
];

const AppFeatures = () => {
     const mobileRef = useRef(null);
     const mobileSectionRef = useRef(null);
     const [isMobileVisible, setIsMobileVisible] = useState(false);
     const showDots = window.innerWidth < 786 ? DottedMobile : Dotted;
     const showMobiles = window.innerWidth < 786 ? MobilesSmall : Mobiles;

     useEffect(() => {
          if (!mobileSectionRef.current) return undefined;

          const observer = new IntersectionObserver(
               ([entry]) => {
                    setIsMobileVisible(entry.isIntersecting);
               },
               {
                    root: null,
                    threshold: 0,
                    rootMargin: "0px 0px -30% 0px",
               }
          );

          observer.observe(mobileSectionRef.current);

          return () => {
               observer.disconnect();
          };
     }, []);

     return (
          <section className="relative bg-linear-to-r from-[#061D0E] via-[#53B175] to-[#061D0E] mix-blend-multiply text-white  overflow-hidden plus-jakarta-sans">

               {/* Left Dotted Overlay */}
               <img
                    src={showDots}
                    alt='Background Dots'
                    className="absolute right-0 top-0 pointer-events-none "
               />

               <div className="max-w-7xl mx-auto py-10 md:py-20 lg:py-25 px-3 md:px-15 lg:px-20">

                    {/* Heading */}
                    <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                         App Features
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
    text-[#061D0E] text-[48px] poppins-regular font-extrabold"
                                             style={{
                                                  clipPath:
                                                       "polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)",
                                                  background: "linear-gradient(145deg,#ffffff,#e9eef2)",
                                                  boxShadow:
                                                       "inset 0 6px 10px rgba(255,255,255,1.9), inset 0 -6px 10px rgba(0,0,0,0.55), 0 14px 20px rgba(0,0,0,0.55)"
                                             }}
                                        >
                                             {step.icons}
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


               <div className="relative z-50">

                    <img src={Preview} alt="Userflow" className='w-full lg:w-[95%] h-100 lg:h-250 mx-auto' />
               </div>

               <div ref={mobileSectionRef} className="relative min-h-[45vh] sm:min-h-screen md:min-h-screen lg:min-h-[165vh]">
                    {/* Mobile Image  */}
                    <img
                         ref={mobileRef}
                         src={showMobiles}
                         alt="Nectar Wireframe"
                         className={`absolute left-0 w-full scale-120 md:scale-100 -top-5 md:-top-25 lg:-top-30 pointer-events-none appfeatures-mobile-enter ${isMobileVisible ? 'is-visible' : ''}`}
                    />
                    <div className='bg-linear-to-b from-[#53B175]/80 backdrop-blur-2xl to-[#061D0E]/80 text-white text-[36px] md:text-[56px] lg:text-[72px] w-67 md:w-105.75 lg:w-xl absolute top-1/2 left-1/2 -translate-1/2 poiret-one-regular text-center rounded-xl px-4 py-6 md:px-8 md:py-10 lg:px-15 lg:py-20 leading-12 md:leading-15 lg:leading-21'>
                         The Experience We Created
                    </div>
               </div>
          </section>
     );
};

export default AppFeatures;