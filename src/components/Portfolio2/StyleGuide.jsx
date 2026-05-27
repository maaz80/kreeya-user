import { HiOutlineArrowLongRight } from "react-icons/hi2";
import '../../CSS/Portfolio1.css'
const StyleGuide = () => {
     const colors = [
          "bg-linear-to-br from-[#782C96] to-[#01B7C5]",
          "bg-[#2C2F48]",
          "bg-[#393D5D]"
     ];

     const handleClick = () => {
          window.location.href = "https://calendly.com/pyush-anand7/new-meeting";
     }

     return (
          <section className="for-white-icons bg-white py-20 plus-jakarta-sans">

               {/* Heading */}
               <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                    The Style Guide
               </h2>

               {/* Color Palette */}
               <div className="grid grid-cols-3 w-full">

                    {colors.map((color, index) => (
                         <div
                              key={color}
                              className={`h-65.5 md:h-80 lg:h-202.75 flex items-start justify-center pt-10 text-white md:font-bold text-[12px] md:text-[32px] ${color}`}
                         >
                              {index === 0 ? "#782C96 → #01B7C5" : color.replace("bg-[", "").replace("]", "")}
                         </div>
                    ))}

               </div>

               {/* Typography Section */}

               <div className="flex flex-col lg:flex-row items-center justify-between max-w-400 mx-auto px-6 md:px-10 pt-10 md:pt-20  space-y-5">
                    <div className=" flex flex-col md:flex-row items-start gap-16 w-full lg:w-[50%] justify-center">

                         {/* Big Aa */}
                         <div className="text-[120px] md:text-[160px] lg:text-[220px] font-bold text-dark-black leading-none">
                              Aa
                         </div>

                         {/* Font details */}

                         <div className="space-y-5 lg:space-y-10">

                              <div>
                                   <p className="text-gray-400 text-[18px] mb-2">Font-family</p>
                                   <h3 className="text-[18px] md:text-[36px] poiret-one-regular">
                                        SF Compact, Lato
                                   </h3>
                                   <div className="h-px bg-gray-300 mt-4 w-55" />
                              </div>

                              <div>
                                   <p className="text-gray-400 text-[18px] mb-2">Weights</p>
                                   <p className="text-[18px] md:text-[36px] poiret-one-regular">
                                        Regular  |  Medium  |  Semibold  |  Bold
                                   </p>
                              </div>

                         </div>

                    </div>

                    <div className="h-px lg:h-100 w-100 lg:w-px bg-linear-to-r lg:bg-linear-to-b from-transparent  via-dark-gray to-transparent"></div>

                    <div className="flex items-center justify-center flex-col gap-5 lg:gap-10 w-full lg:w-[40%]">
                         <h2 className="text-[18px] md:text-[48px] poiret-one-regular mb-2">Collaborate With Us</h2>
                         <button
                              onClick={handleClick}
                              type="submit"
                              className="btn group relative isolate overflow-hidden text-cust-orange text-[20px] w-full h-15 lg:h-25 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover:text-white border-cust-orange border cursor-pointer active:scale-99"
                         >
                              <span className="relative z-10">Get in Touch</span>

                              <HiOutlineArrowLongRight
                                   size={30}
                                   className="relative z-10 text-cust-orange transition-all duration-300 group-hover:text-white"
                              />
                         </button>
                    </div>
               </div>

          </section>
     );
};

export default StyleGuide;