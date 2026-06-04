import dots from "../../assets/dotted.webp";
import { useH2Data } from "../../hooks/useH2data";

const stats = [
     { id: 1, value: "Built for SaaS Growth", text: "more leads", variant: "blue", desc: "We specialize in SaaS and digital products—so we understand the real challenges behind low activation, drop-offs, and churn. " },
     { id: 2, value: "Conversion First Approach", text: "more leads", variant: "white", desc: "Every flow we design is optimized to guide users toward action—whether it's signing up, upgrading, or engaging deeper. We remove friction, simplify journeys, and turn confusion into clarity." },
     { id: 3, value: "Strategy Before Design", text: "more leads", variant: "blue", desc: "We don’t jump into UI. We dive deep into your product, users, and data to uncover what’s actually broken—then design solutions that fix it at the root." },
     { id: 4, value: "Fast, Impact Driven Execution", text: "more leads", variant: "white", desc: "No long timelines. No endless iterations. We deliver high-impact design solutions quickly—so you can test, launch, and scale faster." },
];

const WhyKreeya = () => {
     const h2landing = useH2Data()

     return (
          <section className="relative pt-5 pb-20 overflow-hidden z-9999">

               {/* Background Dots */}
               <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                         backgroundImage: `url(${dots})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center'
                    }}
                    aria-hidden="true"
               />

               <div className="relative max-w-300 mx-auto text-center">

                    {/* Heading */}
                    <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] poiret-one-regular mb-5 text-dark-black">
                         {h2landing.why_kreeya_heading || 'Why Kreeya Design'}
                    </h2>

                    {/* Cards */}
                    <div className="flex flex-wrap justify-center items-center -gap-1 plus-jakarta-sans">

                         {stats.map((item, index) => {

                              const isBlue = item.variant === "blue";

                              return (
                                   <div
                                        key={item.id}
                                        className={`landing-page-card group relative overflow-hidden w-40 md:w-[288px] h-55.5 md:h-100 flex flex-col justify-center items-center text-center rounded-md shadow-xl hover:text-white hover:rotate-0 transition-all duration-700 ease-in-out p-3 md:p-5 lg:p-10
                                       ${isBlue ? "bg-linear-to-b from-[#003D64] via-[#007CC9] to-[#003d64] text-white" : "bg-cust-orange lg:bg-white/40 backdrop-blur-lg text-white lg:text-dark-black"}
                                      ${index % 2 === 0 ? "rotate-3" : "-rotate-3 -translate-x-1"}
                                         `}
                                   >

                                        <h3 className="text-[22px] md:text-[40px] leading-7 md:leading-15 group-hover:leading-10 font-bold z-10 transition-all duration-700 group-hover:-translate-y-4 translate-y-0 lg:translate-y-15">
                                             {item.value}
                                        </h3>

                                        {/* <p className="text-[18px] md:text-[32px] z-10 transition-all duration-700 group-hover:-translate-y-2 translate-y-0 lg:translate-y-12">
                                             {item.text}
                                        </p> */}
                                        <div className="h-px w-full bg-white/60 my-1 z-10 opacity-100 lg:opacity-0 translate-y-0 lg:translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700"></div>

                                        <p className="text-[9px] md:text-[15px] z-10 opacity-100 lg:opacity-0 translate-y-0 lg:translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                                             {item.desc}
                                        </p>

                                   </div>
                              );
                         })}

                    </div>

               </div>

          </section>
     );
};

export default WhyKreeya;