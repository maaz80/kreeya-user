import { lazy, Suspense, useEffect, useState } from "react";
import blogImg from "../assets/blog-thumbnail.webp";
import HomeNavbar from "../components/HomeNavbar";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
const BackgroundShapes = lazy(() => import("../components/BackgroundShapes"));
// const FaqSection = lazy(() => import("../components/FaqSection"));
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/BreadCrumb";
import { Helmet } from "react-helmet-async";
// import SeoTags from '../components/SeoTags';
import '../CSS/Blogs.css'
import { getBlogs } from "../utils/blogService";
import { useH1Data } from "../hooks/useH1Data";
import { useh3Data } from "../hooks/useH3Data";
import useFaq from "../hooks/useFaq";
import OptimizedImage from "../components/OptimizedImage";


const Blogs = () => {
     const navigate = useNavigate();
     const blogsPerPage = 6;
     const [blogs, setBlogs] = useState([])
     const [currentPage, setCurrentPage] = useState(1);
     const h1Blogs = useH1Data();
     const h3Blogs = useh3Data();
     const totalPages = Math.ceil(blogs.length / blogsPerPage);
     const { faqData } = useFaq();
     const startIndex = (currentPage - 1) * blogsPerPage;
     const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

     useEffect(() => {
          window.scrollTo({
               top: 0,
               behavior: "smooth"
          });
     }, [])

     useEffect(() => {

          const fetchBlogs = async () => {

               const data = await getBlogs();
               setBlogs(data);

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

     const heroImg = optimizeImage(blogImg, 1200);

     return (
          <section className="relative px-3 md:px-12 lg:px-20 pt-20 pb-5">
               {/* <SeoTags
                    title="Kreeya Design Blog | Marketing, UI/UX & Branding Insights"
                    description="Read the Kreeya Design blog for practical insights on UI/UX design, brand strategy, digital marketing, and growth-driven creative work."
                    keywords="design blog, branding insights, UI UX tips, marketing blog, digital agency content"
                    canonical="https://kreeyadesign.com/blogs"
               /> */}
               <Helmet>
                    <link
                         rel="preload"
                         as="image"
                         href={heroImg}
                    />
                    <link
                         rel="preload"
                         as="image"
                         href={optimizeImage(blogs[0]?.image, 800)}
                    />
                    <link
                         rel="preload"
                         as="image"
                         href={optimizeImage(blogs[1]?.image, 800)}
                    />
               </Helmet>
               <Breadcrumb />
               <HomeNavbar useScrollTriggers={false} />

               {/* White overlay */}
               <div className="fixed inset-0 bg-white/90 md:bg-white/90 z-10 pointer-events-none" />
               <Suspense fallback={null}>
                    <BackgroundShapes />
               </Suspense>
               {/* Heading */}

               <div className="text-center mb-2 md:mb-6 relative z-999 min-w-[300px] lg:min-w-[1300px] min-h-[110px] lg:min-h-[200px] mx-auto">
                    <h1 className="text-center  text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px]  poiret-one-regular text-dark-black mt-8 min-h-[35px] md:min-h-[60px] lg:min-h-[75px] 2xl:min-h-[90px]">
                         {h1Blogs.main_heading || 'The Growth Journal'}
                    </h1>
                    {/* leading-12 md:leading-15 lg:leading-21 2xl:leading-27.75 */}
                    <p className="text-dark-gray mt-1 md:mt-3 text-[12px] md:text-[18px] lg:text-[24px] leading-9">
                         Smart reads on marketing, design, and business growth.
                    </p>
               </div>

               {/* Featured Blog */}

               <div className="relative group md:flex items-center justify-center mb-16 hidden z-999 w-142 lg:w-290 2xl:w-7xl mx-auto md:h-[319px] lg:h-[652px] 2xl:h-[720px]">

                    <img
                         src={blogImg}
                         alt='The Growth Journal'
                         fetchPriority="high"
                         className="hidden md:block w-142 lg:w-290 2xl:w-7xl object-cover md:h-[319px] lg:h-[652px] 2xl:h-[720px] group-hover:scale-105 transition-all duration-500 ease-in-out md:ml-70 lg:ml-105"
                    />

                    {/* Floating card */}

                    <div className="hidden md:block absolute right-95 -bottom-10  bg-white shadow-[0_0_30px_rgba(0,0,0,0.12)]  p-6 lg:p-10 w-61.25 lg:w-107.5 shrink-0 plus-jakarta-sans  relative overflow-hidden animated-card md:min-h-[180px] xl:min-h-80">

                         <p className="text-[12px] lg:text-[16px] text-dark-gray mb-2 group-hover:text-white transition-all duration-300 ease-in-out">
                              22nd July, 2026 | 3 min read |
                              <span className="text-cust-orange group-hover:text-dark-black transition-all duration-300 ease-in-out"> Technology</span>
                         </p>

                         <h2 className="text-[18px] lg:text-[40px] text-dark-black leading-snug group-hover:text-white transition-all duration-300 ease-in-out">
                              {h3Blogs.blogs_heading_3 || 'Why Design Is the Most Powerful Business Tool You\'re Ignoring'}
                         </h2>

                    </div>

               </div>

               {/* Blog Grid */}


               <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 plus-jakarta-sans relative z-999">

                    {currentBlogs.map((blog, index) => (

                         <div key={blog._id}
                              onClick={() => navigate(`/blogs_details/${blog.slug}`)}
                              className="group cursor-pointer">

                              {/* Image */}

                              <div className="overflow-hidden min-h-[220px] max-h-[220px]">

                                   <OptimizedImage
                                        src={blog.image || blogImg}
                                        alt={blog.alt}
                                        width={500}
                                        height={220}
                                        aspectRatio="25:11"
                                        sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 40px), 386px"
                                        loading={index < 3 ? "eager" : "lazy"}
                                        className="w-full min-h-[220px] max-h-[220px] object-fill transition duration-500 group-hover:scale-105"
                                   />

                              </div>

                              {/* Meta */}

                              <div className="mt-3 text-[12px] md:text-[16px] leading-5 md:leading-6 text-blue flex gap-2 flex-wrap">

                                   <span>{blog.date ? blog.date : '2026-03-16'}</span>

                                   <span>|</span>

                                   <span>{blog.read ? blog.read : '5'} min read</span>

                                   <span>|</span>

                                   <span className="text-cust-orange">
                                        {blog.category ? blog.category : 'Technology'}
                                   </span>

                              </div>

                              {/* Title */}

                              <h3 className="mt-2 text-[18px] md:text-[32px] leading-6 md:leading-10 text-[#0a2742] group-hover:text-orange-500 transition">

                                   {blog.title ? blog.title : '5 Mistakes Startups Make in Branding'}

                              </h3>

                         </div>

                    ))}
               </div>
               <div className={`flex justify-center items-center gap-4 mt-12 md:mt-16 plus-jakarta-sans  relative z-999 ${blogs.length <= blogsPerPage ? 'hidden' : 'block'}`}>

                    {/* Prev */}

                    <button
                         disabled={currentPage === 1}
                         onClick={() => {
                              setCurrentPage((p) => Math.max(p - 1, 1))
                              window.scrollTo({
                                   top: window.innerWidth > 786 ? 800 : 0,
                                   behavior: "smooth"
                              });
                         }}
                         className="w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer disabled:text-dark-gray"
                    >
                         <FaAngleLeft />
                    </button>

                    {/* Page Numbers */}

                    {Array.from({ length: totalPages }, (_, i) => (
                         <button
                              key={i}
                              onClick={() => {
                                   setCurrentPage(i + 1)
                                   window.scrollTo({
                                        top: window.innerWidth > 786 ? 800 : 0,
                                        behavior: "smooth"
                                   });
                              }}
                              className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full ${currentPage === i + 1 ? "bg-cust-orange text-white" : "text-[#0a2742]"}`} >
                              {i + 1}
                         </button>
                    ))}

                    {/* Next */}

                    <button
                         disabled={currentPage === totalPages}
                         onClick={() => {
                              setCurrentPage((p) => Math.min(p + 1, totalPages))
                              window.scrollTo({
                                   top: window.innerWidth > 786 ? 800 : 0,
                                   behavior: "smooth"
                              });
                         }}
                         className="w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer disabled:text-dark-gray"
                    >
                         <FaAngleRight />
                    </button>

               </div>
               {/* <Suspense fallback={null}>
                    <FaqSection paddings={'pt-10 pb-24 md:py-24 px-1 md:px-20'} faqData={faqData} />
               </Suspense> */}
          </section>
     );
};

export default Blogs;