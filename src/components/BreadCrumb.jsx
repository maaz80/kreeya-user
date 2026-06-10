import { Link, useLocation } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";

const Breadcrumb = () => {
     const location = useLocation();

     const pathnames = location.pathname.split("/").filter((x) => x);

     const filteredPathnames = (
          pathnames[0] === "location" && pathnames.length >= 3
               ? [pathnames[pathnames.length - 1]]
               : pathnames
     ).filter((x) => x !== "category");

     const isPortfolio = location.pathname === "/portfolio-beyekls" || location.pathname === "/portfolio-daccord" || location.pathname === "/portfolio-coinpay" || location.pathname === "/portfolio-nectar";
     const isLocation = location.pathname.startsWith("/location");

     return (
          <div className={`flex items-center gap-2 flex-nowrap overflow-hidden text-sm w-full left-0 z-999 plus-jakarta-sans  h-6 md:h-8 absolute px-3 md:px-5 lg:px-20 text-[10px] md:text-[12px] lg:text-[16px] ${isPortfolio ? 'top-0' : 'top-26 lg:top-29'} ${isLocation ? 'bg-transparent' : ' bg-white/60 backdrop-blur-2xl '}`}>
               {/* bg-dark-black/10 */}
               {/**/}
               {/* Home */}

               <Link to="/" className={`flex items-center gap-1 ${isLocation ? 'hover:text-white text-white/60' : 'hover:text-dark-black text-dark-gray'}`}>
                    <HiOutlineHome />
                    Home
               </Link>

               {filteredPathnames.map((name, index) => {

                    const originalIndex = pathnames.indexOf(name);
                    const routeTo = originalIndex !== -1
                         ? "/" + pathnames.slice(0, originalIndex + 1).join("/")
                         : "/" + filteredPathnames.slice(0, index + 1).join("/");
                    const isLast = index === filteredPathnames.length - 1;

                    const label = name
                         .replace(/[-_]/g, " ")
                         .replace(/\b\w/g, (l) => l.toUpperCase());

                    return (
                         <div key={routeTo} className="flex items-center gap-1 md:gap-2">
                              <span className={`text-black`}>/</span>

                              {isLast ? (
                                   <span className={`text-black truncate max-w-30 md:max-w-100 lg:max-w-125`}>{label}</span>
                              ) : (
                                   <Link to={routeTo} className={`text-black truncate max-w-30 md:max-w-100 lg:max-w-125`}>
                                        {label}
                                   </Link>
                              )}

                         </div>
                    );
               })}

          </div>
     );
};

export default Breadcrumb;
