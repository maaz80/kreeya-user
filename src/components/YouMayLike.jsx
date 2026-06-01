import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogs } from "../utils/blogService";
import blogImg from '../assets/blog-thumbnail.webp'
import { useYouMayH2Data } from "../hooks/useYouMayH2Data";

const YouMayLike = () => {
     const navigate = useNavigate()
     const [blogs, setBlogs] = useState([])
     const [loading, setLoading] = useState(true)
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

     const optimizeImage = (url, width = 500) => {
          if (!url) return "";

          return url.replace(
               "/upload/",
               `/upload/ar_25:11,c_fill,g_auto,w_${width},q_auto:eco,f_auto/`
          );
     };

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
                                        navigate(`/blogs_details/${blog.slug}`)
                                        window.scrollTo({
                                             top: 0,
                                             behavior: "smooth"
                                        });
                                   }} key={blog._id} className="group cursor-pointer">

                                        {/* Image */}

                                        <div className="overflow-hidden min-h-55 max-h-55">

                                             <img
                                                  src={blog.image ? optimizeImage(blog.image, 500) : blogImg}
                                                  alt={blog.alt}
                                                  width="500"
                                                  height="220"
                                                  loading={index === 0 ? "eager" : "lazy"}        //   pehli eager
                                                  fetchPriority={index === 0 ? "high" : "low"}    //   pehli high
                                                  decoding={index === 0 ? "sync" : "async"}
                                                  srcSet={`
                                             ${optimizeImage(blog.image, 300)} 480w,
                                             ${optimizeImage(blog.image, 500)} 768w,
                                             ${optimizeImage(blog.image, 800)} 1200w
                                             `}
                                                  sizes="(max-width: 768px) 100vw, 33vw"
                                                  className="
                        w-full
                        min-h-55 max-h-55 
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