import { useEffect, useRef, useState } from "react"
import Mobile1 from '../../assets/nectar-main.webp'
import Mobile2 from '../../assets/nectar-screen.webp'
import Mobile3 from '../../assets/nectar-product.webp'
import Mobile1Mobile from '../../assets/nectar-main-small.webp'
import Mobile3Mobile from '../../assets/nectar-product-small.webp'
import Portfolio from '../../assets/nectar-bg.webp'
import PortfolioMobile from '../../assets/nectar-bg-mobile.webp'

const ShowCase = () => {
     const imageRef = useRef(null)
     const sectionRef = useRef(null)
     const [isShowcaseVisible, setIsShowcaseVisible] = useState(false)

     useEffect(() => {
          if (!sectionRef.current) return undefined;

          const observer = new IntersectionObserver(
               ([entry]) => {
                    setIsShowcaseVisible(entry.isIntersecting);
               },
               {
                    root: null,
                    threshold: 0,
                    rootMargin: "0px 0px -30% 0px",
               }
          );

          observer.observe(sectionRef.current);

          return () => {
               observer.disconnect();
          };
     }, []);

     return (
          <div ref={sectionRef} className='relative overflow-hidden'>

               <div className="relative h-[45vh] md:h-[80vh] 2xl:h-screen">

                    <div className="absolute inset-0">

                         <picture>
                              <source media="(max-width: 785px)" srcSet={PortfolioMobile} />
                              <img
                                   src={Portfolio}
                                   alt='Nectar Bg'
                                   className="absolute inset-0 w-full h-full object-cover"
                              />
                         </picture>

                    </div>
                    <div className="absolute inset-0 bg-linear-to-b from-[#53B175] to-[#061D0E] mix-blend-multiply opacity-100" />
               </div>

               <div
                    ref={imageRef}
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center w-full gap-2 md:gap-6 z-50 showcase-mobile-enter ${isShowcaseVisible ? 'is-visible' : ''}`}
               >

                    {/* Left phone */}
                    <div>
                         <picture>
                              <source media="(max-width: 785px)" srcSet={Mobile1Mobile} />
                              <img src={Mobile1} alt="Nectar Main" className="w-30 md:w-50 lg:w-[320px] h-45 sm:h-60 md:h-100 lg:h-130" />
                         </picture>
                    </div>

                    {/* Center phone (bigger) */}
                    <div className="translate-y-6">
                         <img src={Mobile2} alt="Nectar Screen" className="w-40 md:w-60 lg:w-90 h-70 sm:h-90 md:h-125 lg:h-170" />
                    </div>

                    {/* Right phone */}
                    <div>
                         <picture>
                              <source media="(max-width: 785px)" srcSet={Mobile3Mobile} />
                              <img src={Mobile3} alt="Nectar Product" className="w-30 md:w-50 lg:w-[320px] h-45 sm:h-60 md:h-100 lg:h-130" />
                         </picture>
                    </div>

               </div>

          </div>
     )
}

export default ShowCase