import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

const defaultFaqs = [
     {
          question: "What services does Kreeya Design provide?",
          answer: "Kreeya Design offers UI/UX design, web development, SaaS product design, branding, responsive website design, and SEO-friendly digital solutions."
     },
     {
          question: "How can I contact Kreeya Design?",
          answer: "You can contact Kreeya Design through the official website, contact forms, or business communication channels for project consultations and inquiries."
     },
     {
          question: "Does Kreeya Design work with startups?",
          answer: "Yes, Kreeya Design works with startups, SaaS companies, entrepreneurs, and growing businesses to create scalable digital products."
     },
     {
          question: "Can Kreeya Design redesign an existing website?",
          answer: "Yes, Kreeya Design provides website redesign services focused on improving user experience, responsiveness, and visual appeal."
     },
     {
          question: "Does Kreeya Design create SEO-friendly websites?",
          answer: "Yes, Kreeya Design develops websites optimized for search engines, mobile responsiveness, and fast performance."
     },
     {
          question: "What industries does Kreeya Design work with?",
          answer: "Kreeya Design works with businesses across multiple industries, including SaaS, technology, eCommerce, startups, and service-based businesses."
     },
     {
          question: "Why choose Kreeya Design for UI/UX design?",
          answer: "Businesses choose Kreeya Design because of its user-focused approach, creative design strategies, and expertise in creating engaging digital experiences."
     },
     {
          question: "Does Kreeya Design provide ongoing support?",
          answer: "Yes, Kreeya Design offers ongoing support, maintenance, and consultation services to help businesses maintain digital growth and performance."
     },
];
const FaqSection = ({ paddings }) => {
     const [faqs, setFaqs] = useState(defaultFaqs);
     const [activeIndex, setActiveIndex] = useState(0);
     const toggleFaq = (index) => {
          setActiveIndex(index === activeIndex ? null : index);
     };

     return (
          <section className={` relative z-999 ${paddings}`}>

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