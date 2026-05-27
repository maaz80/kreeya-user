const ProblemsSolved = () => {
     return (
          <section className="for-white-icons w-full bg-white py-10 px-5 md:px-15 md:py-20 plus-jakarta-sans">

               <div className="max-w-full lg:max-w-300 3xl:max-w-[1680px] mx-auto">

                    {/* Heading */}
                    <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                         The Problems We Solved
                    </h2>

                    {/* Content */}
                    <div className="mt-4 md:mt-8 lg:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                         {/* Left text */}
                         <div className="text-dark-gray text-[14px] md:text-[24px] max-w-full lg:max-w-146">
                              <p>
                                   Entitledarts wasn’t able to generate leads from social media.
                                   They were barely growing.
                              </p>

                              <p className="mt-1 md:mt-4">
                                   Their ask was to generate interest from internet,
                                   grow their following, improve their content and help
                                   them grow.
                              </p>
                         </div>

                         {/* Right info */}
                         <div className="space-y-5 md:space-y-10 max-w-90">

                              {/* Status */}
                              <div>
                                   <p className="text-dark-gray text-[12px] lg:text-[18px]">Status</p>

                                   <p className="text-dark-black text-[16px] md:text-[24px] font-bold mt-1">
                                        Ongoing
                                   </p>

                                   <div className="mt-3 h-px w-full bg-[#dcdcdc]" />
                              </div>

                              {/* Worked on */}
                              <div>
                                   <p className="text-dark-gray text-[12px] lg:text-[18px]">Worked on</p>

                                   <p className="text-dark-black text-[16px] md:text-[24px] font-bold mt-1">
                                        Oct 2023 – May 2024
                                   </p>

                                   <div className="mt-3 h-px w-full bg-[#dcdcdc]" />
                              </div>

                         </div>

                    </div>

               </div>

          </section>
     );
};

export default ProblemsSolved;