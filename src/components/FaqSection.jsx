import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { getFaqs } from "../utils/faqService";
import { useh3Data } from "../hooks/useH3Data";

const defaultFaqs = [
     {
          question: "What services do UI UX design agencies offer?",
          answer: "User research, UX strategy, wireframing, UI design, prototyping, and usability testing are all provided by UI/UX design firms to produce user-friendly, conversion-focused digital products for the web and mobile platforms."
     },
     {
          question: "Why do I need a UI UX design company for my business?",
          answer: "By matching design with business objectives, a UI/UX design firm assists you in creating aesthetically pleasing, user-friendly solutions that enhance customer happiness, boost conversions, and minimize expensive usability problems."
     },
     {
          question: "How long does it take to complete a UI UX design project?",
          answer: "Depending on scope, research depth, number of screens, and iterations, a UI/UX design project usually takes four to eight weeks to complete; simpler projects are completed more quickly, whereas complicated products take longer."
     },
     {
          question: "Why do I need a UI UX design company for my business?",
          answer: "A UI/UX design firm assists you in developing user-friendly, intuitive digital experiences that increase conversions, lower friction, and foster trust—all of which help you achieve your business objectives and transform users into devoted clients."
     },
     {
          question: "How do I choose the right UI UX design agency for my business?",
          answer: "When selecting a UI/UX design firm, make sure they can address your unique business difficulties by looking at their portfolio relevancy, customer testimonials, industry experience, design process clarity, and alignment with your budget and objectives."
     },
     {
          question: "What is a UI UX design agency?",
          answer: "A UI/UX design firm specializes in creating user-centered digital experiences by fusing interaction design, visual design, and user research to create products that are simple to use, captivating, and efficient."
     }
];
const FaqSection = ({ paddings, faqData }) => {
     const [faqs, setFaqs] = useState(defaultFaqs);
     const [activeIndex, setActiveIndex] = useState(0);
     const h3Data = useh3Data();
     const toggleFaq = (index) => {
          setActiveIndex(index === activeIndex ? null : index);
     };


     useEffect(() => {
          if (faqData?.faq && faqData.faq.length > 0) {
               setFaqs([...faqData.faq]);
          } else {
               setFaqs(defaultFaqs);
          }
     }, [faqData]);

     return (
          <section className={` relative z-999 ${paddings}`}>

               <div className="max-w-450 mx-auto">

                    {/* Heading */}

                    <h3 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-12 md:mb-16 poiret-one-regular">
                         {h3Data.faq_heading || "Want To Know More? Ask Us"}
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
                                                  {faq.question || faq.ques}
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
                                                       {faq.answer || faq.ans}
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