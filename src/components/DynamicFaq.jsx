import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";


const FaqSection = ({ faq }) => {
     const [faqs, setFaqs] = useState(() => faq ? [...faq] : []);
     const [activeIndex, setActiveIndex] = useState(0);

     useEffect(() => {
          setFaqs(faq ? [...faq] : []);
          setActiveIndex(0);
     }, [faq]);

     const toggleFaq = (index) => {
          setActiveIndex(index === activeIndex ? null : index);
     };

     return (
          <section className={` relative z-999 `}>

               <div className="max-w-450 mx-auto">

                    {/* Heading */}

                    <h3 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-12 md:mb-16 poiret-one-regular">
                         Want To Know More? Ask Us
                    </h3>

                    {/* FAQ */}

                    <div className="space-y-6 cursor-pointer">

                         {faqs.map((faq, index) => {

                              const isOpen = activeIndex === index;

                              return (
                                   <div
                                        key={index}
                                        className="border-b border-gray-300 pb-6 plus-jakarta-sans "
                                   >

                                        {/* Question */}

                                        <button
                                             onClick={() => toggleFaq(index)}
                                             className="w-full flex justify-between items-center text-left"
                                        >

                                             <span
                                                  className={`text-[18px] md:text-[24px] cursor-pointer transition ${isOpen ? "text-cust-orange" : "text-dark-black"
                                                       }`}
                                             >
                                                  {faq.question}
                                             </span>

                                             <span className="relative text-lg md:text-xl w-5 h-5 inline-block">

                                                  <HiPlus
                                                       className={`absolute inset-0 cursor-pointer transition-all duration-300 ${isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                                                            }`}
                                                  />

                                                  <HiMinus
                                                       className={`absolute text-cust-orange cursor-pointer inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                                                            }`}
                                                  />

                                             </span>

                                        </button>

                                        {/* Answer */}

                                        <div
                                             className={`grid transition-all duration-300 ${isOpen
                                                  ? "grid-rows-[1fr] mt-4"
                                                  : "grid-rows-[0fr]"
                                                  }`}
                                        >

                                             <div className="overflow-hidden">

                                                  <p className="text-dark-black  text-[12px] md:text-[16px] lg:text-[18px] leading-5 md:leading-6 lg:leading-8">
                                                       {faq.answer}
                                                  </p>

                                             </div>

                                        </div>

                                   </div>
                              );
                         })}

                    </div>

               </div>

          </section>
     );
};

export default FaqSection;