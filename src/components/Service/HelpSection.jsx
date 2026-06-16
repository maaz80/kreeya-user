import LocationBg from "../../assets/location-bg.webp";

const HelpSection = ({ service }) => {

     return (
          <section className="relative w-full py-8 md:py-24 px-4 md:px-8 overflow-hidden">

               {/* Background Image Overlay */}
               <div className="absolute inset-0">
                    <img
                         src={LocationBg}
                         alt={service?.hero?.title ? `${service.hero.title} Help Background` : ""}
                         loading="lazy"
                         className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-white/20" />
               </div>

               {/* Content */}
               <div className="relative max-w-310 mx-auto plus-jakarta-sans text-dark-black">

                    {/* Heading */}
                    <h2 className="poiret-one-regular text-3xl md:text-5xl xl:text-[56px] leading-10 md:leading-15 max-w-300">
                         {service?.page?.help?.title || "How we can help you for Web Design Service in Delhi"}
                    </h2>

                    {/* Description */}
                    <p className="mt-6 text-sm md:text-base xl:text-[24px] text-dark-black max-w-300 leading-7 md:leading-9">
                         {service?.page?.help?.description ||
                              `We know [City]'s business landscape. Whether you're a [local industry example]
                         in the [City] city centre or a growing startup on the outskirts, Keeya Design
                         builds websites that speak directly to your local audience and rank for the
                         searches that matter. Our team works with businesses throughout [City] and the
                         surrounding area — understanding what local customers expect and what makes them convert.`}
                    </p>

                    {/* Cards */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                         {(service?.page?.help?.cards?.length > 0 ? service?.page?.help?.cards : stats).map((item, i) => (
                              <div
                                   key={i}
                                   className="border border-black/10 bg-white/40 backdrop-blur-sm p-6 md:p-8 text-center hover:shadow-md transition"
                              >
                                   <h2 className="text-3xl md:text-[40px] font-semibold">
                                        {item?.head}
                                   </h2>

                                   <p className="mt-2 text-base md:text-2xl ">
                                        {item?.subhead}
                                   </p>

                                   <p className="mt-4 text-sm md:text-base text-dark-black/50 leading-6">
                                        {item?.para}
                                   </p>
                              </div>
                         ))}

                    </div>
               </div>
          </section>
     );
};

const stats = [
     {
          head: "150+",
          subhead: "Projects delivered",
          para: "Researched for choke points and improved the site traffic by 223%, generating more leads",
     },
     {
          head: "5.0",
          subhead: "Average rating",
          para: "Researched for choke points and improved the site traffic by 223%, generating more leads",
     },
     {
          head: "8+",
          subhead: "Years experience",
          para: "Researched for choke points and improved the site traffic by 223%, generating more leads",
     },
     {
          head: "100%",
          subhead: "Client satisfaction",
          para: "Researched for choke points and improved the site traffic by 223%, generating more leads",
     },
];

export default HelpSection;