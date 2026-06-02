import { useEffect, useState } from "react";
import { getImages } from "../utils/imageService";

const LogoMarquee = () => {

     const [logos, setLogos] = useState([]);
     const [title, setTitle] = useState([])
     useEffect(() => {

          const fetchImages = async () => {

               const data = await getImages();

               // Cloudinary URL extract
               const imageUrls = data.map(item => item.image);
               const itemTitles = data.map(item => item.title);
               setTitle(itemTitles)
               setLogos(imageUrls);

          };

          fetchImages();

     }, []);

     return (
          <div className="w-full overflow-hidden py-6 z-999 relative">

               <div className="marquee-left flex items-center gap-10 md:gap-20 ">

                    {/* first set */}
                    {logos.map((logo, index) => (
                         <img
                              key={index}
                              src={logo}
                              alt={title[index] || "Kreeya Client Logo"}
                              width="200"
                              height="120"
                              className="w-25 md:w-50 h-[72px] md:h-[120px] grayscale hover:grayscale-0 transition-all flex-shrink-0"
                         />
                    ))}

                    {/* duplicate for infinite loop */}
                    {logos.map((logo, index) => (
                         <img
                              key={`dup-${index}`}
                              src={logo}
                              alt={title[index] || "Kreeya Client Logo"}
                              width="200"
                              height="120"
                              className="w-25 md:w-50 h-[72px] md:h-[120px] grayscale hover:grayscale-0 transition-all"
                         />
                    ))}

               </div>
               <div className="marquee-right flex items-center gap-10 md:gap-20">

                    {/* first set */}
                    {logos.map((logo, index) => (
                         <img
                              key={index}
                              src={logo}
                              alt={title[index] || "Kreeya Client Logo"}
                              width="200"
                              height="120"
                              className="w-25 md:w-50 h-[72px] md:h-[120px] grayscale hover:grayscale-0 transition"
                         />
                    ))}

                    {/* duplicate for infinite loop */}
                    {logos.map((logo, index) => (
                         <img
                              key={`dup-${index}`}
                              src={logo}
                              alt={title[index] || "Kreeya Client Logo"}
                              width="200"
                              height="120"
                              className="w-25 md:w-50 h-[72px] md:h-[120px] grayscale hover:grayscale-0 transition"
                         />
                    ))}

               </div>

          </div>
     );
};

export default LogoMarquee;