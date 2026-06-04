import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogs } from "../utils/blogService";
import blogImg from '../assets/blog-thumbnail.webp'
import { useYouMayH2Data } from "../hooks/useYouMayH2Data";
import OptimizedImage from "./OptimizedImage";
import staticBlogs from "../data/staticBlogs.json";

const YouMayLike = () => {
     const navigate = useNavigate()
     const localBlogs = (staticBlogs || []).slice(0, 3);
     const [blogs, setBlogs] = useState(localBlogs)
     const [loading, setLoading] = useState(!localBlogs.length)
     const h2youMay = useYouMayH2Data()

     useEffect(() => {
          const fetchBlogs = async () => {
               try {
                    const data = await getBlogs();
                    setBlogs(data.slice(0, 3));
               } catch (error) {
                    console.error("Error fetching blogs for YouMayLike:", error);
               } finally {
                    setLoading(false);
               }
          };

          fetchBlogs();
     }, []);

     return (
          <section className="relative z-999 mt-10 md:mt-20">

               <div className="">

                    {/* Heading */}

                    <h2 className="text-start leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                         {h2youMay.main_heading || 'You May Also Like This'}
                    </h2>

                    {/* Blog Grid */}

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 plus-jakarta-sans">

                         {loading ? (
                              Array.from({ length: 3 }).map((_, index) => (
                                   <div key={index} className="animate-pulse flex flex-col gap-3 w-full">
                                        {/* Skeleton Image */}
                                        <div className="bg-slate-200 w-full h-55 rounded-3xl"></div>
                                        {/* Skeleton Meta */}
                                        <div className="flex gap-2 mt-2">
                                             <div className="h-4 bg-slate-200 rounded w-16"></div>
                                             <div className="h-4 bg-slate-200 rounded w-2"></div>
                                             <div className="h-4 bg-slate-200 rounded w-20"></div>
                                        </div>
                                        {/* Skeleton Title */}
                                        <div className="h-7 bg-slate-200 rounded w-5/6 mt-2"></div>
                                        <div className="h-7 bg-slate-200 rounded w-2/3"></div>
                                   </div>
                              ))
                         ) : (
                              blogs.map((blog, index) => (

                                   <div onClick={() => {
                                        navigate(`/${blog.slug}`)
                                        window.scrollTo({
                                             top: 0,
                                             behavior: "smooth"
                                        });
                                   }} key={blog._id} className="group cursor-pointer">

                                        {/* Image */}

                                        <div className="overflow-hidden min-h-50 max-h-50">

                                             <OptimizedImage
                                                  src={blog.image || blogImg}
                                                  alt={blog.alt}
                                                  width={500}
                                                  height={240}
                                                  // aspectRatio="25:11"
                                                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 40px), 386px"
                                                  loading={index === 0 ? "eager" : "lazy"}
                                                  className="
                        w-full
                        min-h-50 max-h-50 
                        object-fill
                        transition
                        duration-500
                        group-hover:scale-105
                        "
                                             />

                                        </div>

                                        {/* Meta */}

                                        <div className="mt-3 text-[12px] md:text-[16px] leading-5 md:leading-6 text-blue flex gap-2 flex-wrap">

                                             <span>{blog.date}</span>

                                             <span>|</span>

                                             <span>{blog.read} min read</span>

                                             <span>|</span>

                                             <span className="text-cust-orange">
                                                  {blog.category}
                                             </span>

                                        </div>

                                        {/* Title */}

                                        <h3 className="mt-2 text-[18px] md:text-[32px] leading-6 md:leading-10 text-[#0a2742] group-hover:text-orange-500 transition line-clamp-3">

                                             {blog.title}

                                        </h3>

                                   </div>

                              ))
                         )}

                    </div>


               </div>

          </section>
     );
};

export default YouMayLike;