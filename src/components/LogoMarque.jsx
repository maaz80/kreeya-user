import { useEffect, useState } from "react";
import { getImages } from "../utils/imageService";
import { useDataContext } from "../context/DataContext";

const LogoMarquee = () => {
     const { logos: contextLogos } = useDataContext();

     const [logos, setLogos] = useState(() => {
          if (contextLogos && contextLogos.length > 0) {
               return contextLogos.map(item => item.image);
          }
          return [];
     });
     const [title, setTitle] = useState(() => {
          if (contextLogos && contextLogos.length > 0) {
               return contextLogos.map(item => item.title);
          }
          return [];
     });

     useEffect(() => {
          if (contextLogos && contextLogos.length > 0) {
               setLogos(contextLogos.map(item => item.image));
               setTitle(contextLogos.map(item => item.title));
          } else {
               const fetchImages = async () => {
                    const data = await getImages();
                    if (data) {
                         setLogos(data.map(item => item.image));
                         setTitle(data.map(item => item.title));
                    }
               };
               fetchImages();
          }
     }, [contextLogos]);

     return (
          <div className="w-full overflow-hidden py-6 z-999 relative">

               <div className="marquee-left flex items-center gap-10 md:gap-20 ">

                    {/* first set */}
                    {logos.map((logo, index) => (
                         <img
                              key={index}
                              src={logo?.src || logo}
                              alt={title[index] || "Kreeya Client Logo"}
                              width="200"
                              height="120"
                              loading="lazy"
                              className="w-25 md:w-50 h-[60px] md:h-[120px] object-contain grayscale hover:grayscale-0 transition-all flex-shrink-0"
                         />
                    ))}

                    {/* duplicate for infinite loop */}
                    {logos.map((logo, index) => (
                         <img
                              key={`dup-${index}`}
                              src={logo?.src || logo}
                              alt={title[index] || "Kreeya Client Logo"}
                              width="200"
                              height="120"
                              loading="lazy"
                              className="w-25 md:w-50 h-[60px] md:h-[120px] object-contain grayscale hover:grayscale-0 transition-all"
                         />
                    ))}

               </div>
               <div className="marquee-right flex items-center gap-10 md:gap-20">

                    {/* first set */}
                    {logos.map((logo, index) => (
                         <img
                              key={index}
                              src={logo?.src || logo}
                              alt={title[index] || "Kreeya Client Logo"}
                              width="200"
                              height="120"
                              loading="lazy"
                              className="w-25 md:w-50 h-[60px] md:h-[120px] object-contain grayscale hover:grayscale-0 transition"
                         />
                    ))}

                    {/* duplicate for infinite loop */}
                    {logos.map((logo, index) => (
                         <img
                              key={`dup-${index}`}
                              src={logo?.src || logo}
                              alt={title[index] || "Kreeya Client Logo"}
                              width="200"
                              height="120"
                              loading="lazy"
                              className="w-25 md:w-50 h-[60px] md:h-[120px] object-contain grayscale hover:grayscale-0 transition"
                         />
                    ))}

               </div>

          </div>
     );
};

export default LogoMarquee;
