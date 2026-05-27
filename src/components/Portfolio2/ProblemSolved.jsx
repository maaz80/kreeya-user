const ProblemsSolved = () => {
     return (
          <section className="for-white-icons w-full bg-white py-10 px-5 md:px-15 md:py-20 plus-jakarta-sans">

               <div className="max-w-full lg:max-w-300 3xl:max-w-[1680px] mx-auto">

                    {/* Heading */}
                    <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                         The Problems We Solved
                    </h2>

                    {/* Content */}
                    <div className="mt-4 md:mt-8 lg:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                         {/* Left text */}
                         <div className="text-dark-gray text-[14px] md:text-[24px] max-w-full lg:max-w-206 col-span-2">
                              <p>
                                   Today’s online community platforms often overwhelm users with cluttered navigation, inconsistent visual hierarchy, and scattered conversations—especially for new users who are trying to discover relevant communities. As a result, people struggle to find the right spaces, track activity, and connect meaningfully.
                              </p>

                              <p className="mt-1 md:mt-4">
                                   Daccord aims to create a more intuitive, visually guided, and personalized community experience where exploration feels effortless and engagement becomes natural.
                              </p>
                         </div>

                         {/* Right info */}
                         <div className="space-y-5 md:space-y-10 max-w-90">

                              {/* Status */}
                              <div>
                                   <p className="text-dark-gray text-[12px] lg:text-[18px]">Status</p>

                                   <p className="text-dark-black text-[16px] md:text-[24px] font-bold mt-1">
                                        Completed
                                   </p>

                                   <div className="mt-3 h-px w-full bg-[#dcdcdc]" />
                              </div>

                              {/* Worked on */}
                              <div>
                                   <p className="text-dark-gray text-[12px] lg:text-[18px]">Worked on</p>

                                   <p className="text-dark-black text-[16px] md:text-[24px] font-bold mt-1">
                                        Oct 2024 - May 2025
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