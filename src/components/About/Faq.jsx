import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

const defaultFaqs = [
     {
          question: "What services does Kreeya Design offer?",
          answer: "Kreeya Design offers UI/UX design, web development, SaaS product design, branding, digital strategy, and SEO-friendly website solutions."
     },
     {
          question: "Why should businesses choose Kreeya Design?",
          answer: "Businesses choose Kreeya Design because of its innovative approach, user-focused designs, scalable solutions, and commitment to delivering measurable results."
     },
     {
          question: "Does Kreeya Design create mobile-responsive websites?",
          answer: "Yes, Kreeya Design develops fully responsive websites optimized for desktops, tablets, and mobile devices."
     },
     {
          question: "Is Kreeya Design suitable for startups?",
          answer: "Absolutely. Kreeya Design works closely with startups to create scalable digital products, SaaS platforms, and modern branding strategies."
     },
     {
          question: "How does Kreeya Design improve SEO?",
          answer: "Kreeya Design focuses on SEO-friendly layouts, fast-loading pages, responsive designs, and optimized website structures to improve search engine rankings."
     },
     {
          question: "Does Kreeya Design provide custom UI/UX solutions?",
          answer: "Yes, Kreeya Design creates customized UI/UX solutions tailored to the business goals and target audience of each client."
     },
     {
          question: "Can Kreeya Design help with SaaS platforms?",
          answer: "Yes, Kreeya Design specializes in SaaS product design, including dashboards, onboarding flows, and user-friendly interfaces."
     },
     {
          question: "How can I contact Kreeya Design?",
          answer: "You can visit the official website of Kreeya Design to learn more about services, portfolio, and project consultations."
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