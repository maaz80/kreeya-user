import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAbout } from "../../utils/aboutService";
import OptimizedImage from "../OptimizedImage";

const TeamCraft = () => {
     const location = useLocation();
     const [about, setAbout] = useState();
     const [title, setTitle] = useState('')
     const [leftImgAlt, setLeftImg] = useState('')
     const [rightImgAlt, setRightImg] = useState('')
     const [quote, setquote] = useState('We design exceptional brands, products, web apps, mobile apps, websites for startups and enterprises.')


     useEffect(() => {

          const fetchAbout = async () => {

               const data = await getAbout();
               if (!data || data.length === 0) return;

               const aboutData = data[0];

               setTitle(aboutData.title);
               setLeftImg(aboutData.leftImg);
               setRightImg(aboutData.rightImg);
               setquote(aboutData.quote);


          };

          fetchAbout();

     }, []);
     // Smooth scroll for navigation 
     useEffect(() => {
          const navType = performance.getEntriesByType("navigation")[0]?.type;

          if (location.hash && navType !== "reload") {
               const el = document.querySelector(location.hash);

               if (el) {
                    setTimeout(() => {
                         el.scrollIntoView({
                              behavior: "smooth"
                         });
                    }, 200);
               }
          }
     }, [location]);

     return (
          <section id="about" className="relative py-10 md:pt-24 md:pb-10 px-4 md:px-20 overflow-hidden z-999">

               <div className="max-w-450 mx-auto max-h-260 md:max-h-380">

                    {/* Heading */}

                    <h2 className="text-center text-[36px] md:text-[56px] lg:text-[72px] xl:text-[96px] leading-12 md:leading-15 lg:leading-21 xl:leading-27.75 mb-4 md:mb-10 lg:mb-16 poiret-one-regular">
                         {title ? title : 'The Hand Behind The Craft'}
                    </h2>

                    {/* Content */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">

                         {/* Left image */}

                         <div className="flex justify-center overflow-hidden">
                              <OptimizedImage
                                   src={leftImgAlt}
                                   alt="Kreeya Design Team at Work"
                                   className=" w-full max-w-77.75 lg:max-w-154.75 xl:max-w-205 h-118.75 lg:h-236 xl:h-312.5 rounded-[10px_35px_10px_35px] md:rounded-[9px_30px_9px_30px] lg:rounded-[18px_60px_18px_60px] xl:rounded-[24px_80px_24px_80px] object-cover saturate-0 "
                              />
                         </div>

                         {/* Right content */}

                         <div className="grid grid-rows-2 items-start justify-center overflow-hidden">

                              <OptimizedImage
                                   src={rightImgAlt}
                                   alt="Kreeya Design Creative Team"
                                   className=" w-full max-w-79 lg:max-w-154.75 xl:max-w-205 h-80.25 lg:h-208 xl:h-275 rounded-[10px_35px_10px_35px] md:rounded-[9px_30px_9px_30px] lg:rounded-[18px_60px_18px_60px] xl:rounded-[24px_80px_24px_80px] object-cover saturate-0 "
                              />

                              <p className=" mt-2 text-right md:text-right text-blue max-w-79 lg:max-w-154.75 xl:max-w-205 ml-auto text-[16px] lg:text-[24px] leading-6 lg:leading-9 ">

                                   {quote ? quote : 'We design exceptional brands, products, web apps, mobile apps, websites for startups and enterprises. We design exceptional brands, products, mobile apps, websites for startups and enterprises.'}

                              </p>

                         </div>

                    </div>

               </div>

          </section>
     );
};

export default TeamCraft;