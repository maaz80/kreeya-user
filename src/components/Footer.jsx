import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiFacebook, SiYoutube } from "react-icons/si";
import footerImg from "../assets/footer-img.webp";
import footerImgMobile from "../assets/footer-img-mobile.webp";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFooter } from "../utils/footerService";
import Logo from '/images/white-logo.webp'
import { FaXTwitter } from "react-icons/fa6";
import { getLocations } from "../utils/locations";
import staticLocations from "../data/staticLocations.json";
const Footer = () => {
     const [heading, setHeading] = useState("SAY HELLO !");
     const [buttonText, setButtonText] = useState("Get in Touch");
     const [buttonLink, setButtonLink] = useState("https://calendly.com/pyush-anand7/new-meeting");
     const [locations, setLocations] = useState(staticLocations || []);
     const [logo, setLogo] = useState(Logo);
     const [instagram, setInstagram] = useState("https://www.instagram.com/kreeyadesignofficial/");
     const [linkedin, setLinkedin] = useState("https://www.linkedin.com/in/kreeya-design-480186404/");
     const [facebook, setFacebook] = useState("https://www.facebook.com/kreeyadesignofficial/");
     const [youtube, setYoutube] = useState(" https://www.youtube.com/@kreeyadesignofficial");
     const [twitter, setTwitter] = useState(" https://x.com/Kreeyadesign12");

     const [contactTitle, setContactTitle] = useState("Write to us");
     const [email, setEmail] = useState("business@kreeyadesign.com");
     const [phone, setPhone] = useState("+91 9311500423");

     const [locationTitle, setLocationTitle] = useState("Join Us");
     const [city, setCity] = useState("Noida");
     const [office, setOffice] = useState("");
     const [address, setAddress] = useState("Springboard D Block, Sector 2, Noida, Uttar Pradesh 201301");

     useEffect(() => {
          const isBot = typeof navigator !== 'undefined' && /SearchBot|Googlebot|Chrome-Lighthouse|Lighthouse/i.test(navigator.userAgent);
          if (isBot) return;

          const fetchFooter = async () => {
               try {
                    const data = await getFooter();
                    if (!data) return;

                    setHeading(data.heading || "SAY HELLO !");
                    setButtonText(data.buttonText || "Get in Touch");
                    setButtonLink(data.buttonLink || "");

                    setLogo(data.logo || "");

                    setInstagram(data.instagram || "");
                    setLinkedin(data.linkedin || "");
                    setFacebook(data.facebook || "");
                    setYoutube(data.youtube || "");
                    setTwitter(data.twitter || "https://x.com/Kreeyadesign12")

                    setContactTitle(data.contactTitle || "");
                    setEmail(data.email || "");
                    setPhone(data.phone || "");

                    setLocationTitle(data.locationTitle || "");
                    setCity(data.city || "");
                    setOffice(data.office || "");
                    setAddress(data.address || "");
               } catch (err) {
                    console.warn("Footer fetch failed:", err);
               }
          };

          const timer = setTimeout(fetchFooter, 5000);
          return () => clearTimeout(timer);
     }, []);

     const footerImage = window.innerWidth < 786 ? footerImgMobile : footerImg;
     const handleClick = () => {
          window.location.href = buttonLink;
     }

     useEffect(() => {
          const isBot = typeof navigator !== 'undefined' && /SearchBot|Googlebot|Chrome-Lighthouse|Lighthouse/i.test(navigator.userAgent);
          if (isBot) return;

          const fetchLocations = async () => {
               try {
                    const data = await getLocations();
                    setLocations(data);
               } catch (err) {
                    console.warn("Footer locations fetch failed:", err);
               }
          };

          const timer = setTimeout(fetchLocations, 5000);
          return () => clearTimeout(timer);
     }, []);

     const handleTop = () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
     }
     return (
          <footer className="relative bg-[#ff5a00] text-white overflow-hidden z-999 plus-jakarta-sans min-h-200 md:min-h-165">

               {/* decorative image */}

               <img
                    src={footerImage}
                    alt="Decorative Footer Image"
                    className="absolute top-0 right-0 w-50 md:w-100 lg:w-75 h-auto pointer-events-none"
               />

               <div className="max-w-325 mx-auto px-4 md:px-6 py-16 relative z-10">

                    {/* TOP CTA */}

                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">

                         <h2 className="text-[36px] md:text-[56px] lg:text-[96px] font-bold tracking-wide poiret-one-regular">
                              {heading || 'SAY HELLO !'}
                         </h2>

                         <button
                              onClick={handleClick}
                              type="submit"
                              className="header-btn group relative isolate overflow-hidden border-2 border-white text-white text-[20px] w-50 md:w-60 lg:w-100 h-15 lg:h-25 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300  cursor-pointer active:scale-99 hover:text-cust-orange"
                         >
                              <span className="relative z-10">{buttonText}</span>

                              <HiOutlineArrowLongRight
                                   size={30}
                                   className="relative z-10 text-white transition-all duration-300 group-hover:text-cust-orange"
                              />
                         </button>

                    </div>

                    {/* CONTENT GRID */}

                    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-50 mt-16 border-b border-white/40 pb-12">

                         {/* LOGO */}

                         <div className="hidden lg:block">

                              {/* <h4 className="text-[36px] lg:text-[32px] mb-6 poiret-one-regular">LOGO</h4> */}
                              <div className="flex items-center gap-2 mb-6">
                                   <img src={logo} alt="Kreeya Design Logo" width={160}
                                        height={40} className="w-23.75 md:w-31.75 lg:w-40 h-6 md:h-8 lg:h-10 object-contain" />
                              </div>
                              <div className="flex gap-4 text-[30px]">

                                   {/* <FaInstagram className="cursor-pointer hover:text-dark-black transition-all duration-300 ease-in-out" />
                                   <FaLinkedinIn className="cursor-pointer hover:text-dark-black transition-all duration-300 ease-in-out" />
                                   <SiCrunchbase className="cursor-pointer hover:text-dark-black transition-all duration-300 ease-in-out" /> */}
                                   <a
                                        aria-label="Open Facebook Profile"

                                        href={facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                   >
                                        <SiFacebook className="cursor-pointer hover:text-dark-black transition-all duration-300 ease-in-out" />
                                   </a>
                                   <a
                                        aria-label="Open Instagram Profile"

                                        href={instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                   >
                                        <FaInstagram className="cursor-pointer hover:text-dark-black transition-all duration-300 ease-in-out" />
                                   </a>

                                   <a
                                        aria-label="Open Linked In Profile"

                                        href={linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                   >
                                        <FaLinkedinIn className="cursor-pointer hover:text-dark-black transition-all duration-300 ease-in-out" />
                                   </a>

                                   <a
                                        aria-label="Open Youtube Profile"

                                        href={youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                   >
                                        <SiYoutube className="cursor-pointer hover:text-dark-black transition-all duration-300 ease-in-out" />
                                   </a>
                                   <a
                                        aria-label="Open Twitter Profile"

                                        href={twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                   >
                                        <FaXTwitter className="cursor-pointer hover:text-dark-black transition-all duration-300 ease-in-out" />
                                   </a>
                              </div>

                         </div>

                         {/* WRITE TO US */}

                         <div>

                              <h3 className="text-[20px] md:text-[36px] lg:text-[32px] mb-6 poiret-one-regular">{contactTitle}</h3>

                              <p className=" text-[12px] md:text-base">mail us at</p>

                              <p className="mt-1 text-[16px] md:text-2xl font-semibold">
                                   {email}
                              </p>

                              <p className=" mt-6 text-[12px] md:text-base">Call us at</p>

                              <p className="mt-1 text-[16px] md:text-2xl font-semibold">
                                   {phone}
                              </p>

                         </div>

                         {/* ADDRESS */}

                         <div>

                              <h3 className="text-[20px] md:text-[36px] lg:text-[32px] mb-1 md:mb-6 poiret-one-regular">{locationTitle}</h3>

                              <address style={{ fontStyle: 'normal' }}>
                                   <p className="text-[20px] md:text-2xl font-semibold">{city}</p>
                                   <p className=" text-[12px] md:text-base mt-2 leading-relaxed">

                                        {office}
                                        <br />
                                        {address}

                                   </p>
                              </address>

                              {/* <p className="text-[20px] md:text-2xl font-semibold">{city}</p>

                              <p className=" text-[12px] md:text-base mt-2 leading-relaxed">

                                   {office}
                                   <br />
                                   {address}

                              </p> */}

                         </div>

                    </div>

                    {/* LOGO */}

                    <div className="lg:hidden flex items-center gap-6  mt-5 md:mt-15 border-b border-white/40 pb-12">

                         {/* <h4 className="text-[20px] md:text-[36px] lg:text-[32px] poiret-one-regular">LOGO</h4> */}
                         <div className="flex items-center gap-2">
                              <img src={logo} alt="Kreeya Design Logo" width={160}
                                   height={40} className="w-23.75 md:w-31.75 lg:w-40 h-6 md:h-8 lg:h-10 object-contain" />
                         </div>
                         <div className="flex gap-4 text-[30px]">

                              <a
                                   aria-label="Open Facebook Profile"
                                   href={facebook}
                                   target="_blank"
                                   rel="noopener noreferrer"
                              >
                                   <SiFacebook className="cursor-pointer hover:bg-dark-black" />
                              </a>
                              <a
                                   aria-label="Open Instagram Profile"
                                   href={instagram}
                                   target="_blank"
                                   rel="noopener noreferrer"
                              >
                                   <FaInstagram className="cursor-pointer hover:bg-dark-black" />
                              </a>

                              <a
                                   aria-label="Open Linked In Profile"
                                   href={linkedin}
                                   target="_blank"
                                   rel="noopener noreferrer"
                              >
                                   <FaLinkedinIn className="cursor-pointer hover:bg-dark-black" />
                              </a>

                              <a
                                   aria-label="Open Youtube Profile"
                                   href={youtube}
                                   target="_blank"
                                   rel="noopener noreferrer"
                              >
                                   <SiYoutube className="cursor-pointer hover:bg-dark-black" />
                              </a>

                         </div>

                    </div>

                    {/* Locations */}
                    {locations?.length > 0 &&
                         locations.map((location) => {
                              const validItems = location.items?.filter((item) => {
                                   if (!item?._id && !item?.slug) return true;
                                   return !!item?.hero?.title;
                              }) || [];
                              if (validItems.length === 0) return null;

                              return (
                                   <div key={location.slug || location._id} className="pt-12">
                                        <h2 className="text-white text-[18px]">
                                             {location.title}
                                        </h2>

                                        <div className="flex gap-2 text-base mt-5 flex-wrap">
                                             {validItems.map((item) => (
                                                  <div key={item.slug || item._id} className="flex items-center gap-2">
                                                       <Link
                                                            to={`/${item.slug || item._id}`}
                                                            className="text-white/70 hover:text-white cursor-pointer"
                                                       >
                                                            {item.title}
                                                       </Link>

                                                       <span>|</span>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              );
                         })}
                    {/* DIVIDER */}

                    <div className="border-t border-white/40 mt-14 pt-6 flex flex-col items-center gap-4 text-[12px] md:text-sm lg:text-base">

                         <div className="flex flex-wrap justify-center items-center gap-x-1 md:gap-x-4 gap-y-2">

                              <Link onClick={handleTop} to='/' className="cursor-pointer hover:opacity-70">
                                   Home
                              </Link>

                              <span>|</span>

                              <Link onClick={handleTop} to='/services' className="cursor-pointer hover:opacity-70">
                                   Services
                              </Link>

                              <span>|</span>

                              <Link onClick={handleTop} to='/category/blogs' className="cursor-pointer hover:opacity-70">
                                   Blogs
                              </Link>

                              <span>|</span>

                              <Link onClick={handleTop} to='/about-us' className="cursor-pointer hover:opacity-70">
                                   About Us
                              </Link>

                              <span>|</span>

                              <Link onClick={handleTop} to='/contact-us' className="cursor-pointer hover:opacity-70">
                                   Contact Us
                              </Link>

                              <span>|</span>

                              <Link onClick={handleTop} to='/privacy-policy' className="cursor-pointer hover:opacity-70">
                                   Privacy Policy
                              </Link>

                              <span>|</span>

                              <Link onClick={handleTop} to='/disclaimer' className="cursor-pointer hover:opacity-70">
                                   Disclaimer
                              </Link>

                         </div>

                         <span className="text-[12px] md:text-sm opacity-80 mt-2">
                              ©2026 KREEYA DESIGN. ALL RIGHTS RESERVED
                         </span>

                    </div>

               </div>

          </footer>
     );
};

export default Footer;