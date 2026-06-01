import CardImg from "../../assets/404-bg.webp";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import OptimizedImage from '../OptimizedImage';

const Services = ({ location }) => {
     const locationContent = location?.page?.location;

     const handleClick = () => {
          window.location.href = "https://calendly.com/pyush-anand7/new-meeting";
     }

     const optimizeImage = (url, width) => {
          if (!url || typeof url !== "string") return "";
          if (!url.includes("/upload/")) return url;
          return url.replace(
               "/upload/",
               `/upload/ar_35:26,c_fill,g_auto,w_${width},q_auto:eco,f_auto/`
          );
     };

     return (
          <section id="location-services" className="relative w-full py-10 md:py-24 px-4 md:px-8 overflow-hidden bg-linear-to-b from-[#003D64] via-[#007CC9] to-[#003D64] text-white ">


               {/* Content */}
               <div className="relative max-w-[1240px] mx-auto text-center plus-jakarta-sans flex flex-col justify-center items-center">

                    {/* Heading */}
                    <h2 className="poiret-one-regular text-[32px] md:text-[56px] xl:text-[72px] leading-10 md:leading-15">
                         {locationContent?.title || "Our Specialized Services"}
                    </h2>

                    {/* Subtext */}
                    <p className="mt-4 md:mt-6 text-sm md:text-base xl:text-[20px] text-white max-w-[760px] mx-auto leading-7 md:leading-8">
                         {locationContent?.description ||
                              `We're a [City]-based creative studio helping local businesses and startups
                         build brands people remember — from logo to launch.`}
                    </p>

                    {/* Cards */}
                    <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-center justify-center">

                         {(locationContent?.cards?.length > 0 ? locationContent.cards : services).map((item, i) => {
                              const imageSrc = item.image || CardImg;

                              return (
                              <div
                                   key={i}
                                   className="group bg-white/5 border border-white/10 overflow-hidden hover:-translate-y-1 transition duration-300 w-[302px] min-h-88 max-h-[360px]"
                              >
                                   {/* Image */}
                                   <div className="w-full h-[223px] overflow-hidden">
                                        <OptimizedImage
                                             src={imageSrc}
                                             alt={`${item.para || item.title || "Service"} - Service Image`}
                                             width={302}
                                             height={224}
                                             aspectRatio="35:26"
                                             sizes="(max-width: 340px) calc(100vw - 32px), 302px"
                                             className="w-full h-full object-fill group-hover:scale-105 transition duration-300"
                                        />
                                   </div>

                                   {/* Bottom Text */}
                                        <div className="bg-white/5 min-h-32 flex items-center justify-center">
                                        <p className="text-[18px] leading-6 md:leading-7 text-white/90">
                                             {item.para || item.title}
                                        </p>
                                   </div>
                              </div>
                         )})}

                    </div>

                    {/* CTA */}
                    <div className="mt-12 md:mt-16 flex justify-center">
                         <button
                              onClick={handleClick}
                              type="submit"
                              className="service-btn group relative isolate overflow-hidden text-white bg-transparent text-[15px] md:text-[18px] w-44 md:w-60 h-12 lg:h-[60px] flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover:text-blue border-white border cursor-pointer active:scale-99 text-center"
                         >
                              <span className="relative z-10">Get in Touch</span>

                              <HiOutlineArrowLongRight
                                   size={30}
                                   className="hidden md:block relative z-10 text-white transition-all duration-300 group-hover:text-blue"
                              />
                              <HiOutlineArrowLongRight
                                   size={24}
                                   className=" md:hidden relative z-10 text-white transition-all duration-300 group-hover:text-blue"
                              />
                         </button>
                    </div>

               </div>
          </section>
     );
};

const services = [
     {
          title: "Brand identity — Logo, colours, typography",
          image: CardImg,
     },
     {
          title: "Web design — Conversion-led websites",
          image: CardImg,
     },
     {
          title: "UI/UX design — Apps and dashboards",
          image: CardImg,
     },
     {
          title: "Digital marketing — SEO and leads",
          image: CardImg,
     },
     {
          title: "Brand identity — Logo, colours, typography",
          image: CardImg,
     },
     {
          title: "Web design — Conversion-led websites",
          image: CardImg,
     },
     {
          title: "UI/UX design — Apps and dashboards",
          image: CardImg,
     },
     {
          title: "Digital marketing — SEO and leads",
          image: CardImg,
     },
];

export default Services;
