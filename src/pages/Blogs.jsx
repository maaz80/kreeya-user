import { lazy, Suspense, useEffect, useState } from "react";
import blogImg from "/images/blog-thumbnail.webp";
// import HomeNavbar from "../components/HomeNavbar";
import HomeNavbarV2 from "../components/HomeNavbarV2";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
const BackgroundShapes = lazy(() => import("../components/BackgroundShapes"));
const FaqSection = lazy(() => import("../components/FaqSection"));
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/BreadCrumb";
import { Helmet } from "react-helmet-async";
// import SeoTags from '../components/SeoTags';
import '../CSS/Blogs.css'
import { useDataContext } from "../context/DataContext";
import { useH1Data } from "../hooks/useH1Data";
import { useh3Data } from "../hooks/useH3Data";
import useFaq from "../hooks/useFaq";
import OptimizedImage, { buildCloudinaryUrl } from "../components/OptimizedImage";
import staticBlogs from "../data/staticBlogs.json";


const Blogs = () => {
     const navigate = useNavigate();
     const blogsPerPage = 6;
     const { blogs: ctxBlogs, isLoading: contextLoading } = useDataContext();
     const blogs = (ctxBlogs && ctxBlogs.length > 0) ? ctxBlogs : (staticBlogs || []);
     const isLoading = contextLoading && blogs.length === 0;
     const [currentPage, setCurrentPage] = useState(1);
     const h1Blogs = useH1Data();
     const h3Blogs = useh3Data();
     const totalPages = Math.ceil(blogs.length / blogsPerPage);
     const { faqData } = useFaq();
     const startIndex = (currentPage - 1) * blogsPerPage;
     const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);
     const isDesktop = window.innerWidth >= 768;
     const firstBlogImage = buildCloudinaryUrl(staticBlogs?.[0]?.image, {
          width: 750,
          height: 330
     });
     // console.log("First blog image:", firstBlogImage);
     useEffect(() => {
          window.scrollTo({
               top: 0,
               behavior: "smooth"
          });
     }, [])

     // const optimizeImage = (url, width = 500) => {
     //      if (!url) return "";

     //      return url.replace(
     //           "/upload/",
     //           `/upload/ar_25:11,c_fill,g_auto,w_${width},q_auto:eco,f_auto/`
     //      );
     // };

     // const heroImg = optimizeImage(blogImg, 1200);

     return (
          <section className="relative px-3 md:px-12 lg:px-20 pt-25 pb-5">
               {/* <SeoTags
                    title="Kreeya Design Blog | Marketing, UI/UX & Branding Insights"
                    description="Read the Kreeya Design blog for practical insights on UI/UX design, brand strategy, digital marketing, and growth-driven creative work."
                    keywords="design blog, branding insights, UI UX tips, marketing blog, digital agency content"
                    canonical="https://kreeyadesign.com/blogs"
               /> */}
               <Helmet>
                    {firstBlogImage && (
                         <link
                              rel="preload"
                              as="image"
                              href={firstBlogImage}
                              imageSizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 40px), 386px"
                         />
                    )}
               </Helmet>
               <Breadcrumb />
               {/* <HomeNavbar useScrollTriggers={false} /> */}
               <HomeNavbarV2 useScrollTriggers={false} />

               {/* White overlay */}
               <div className="fixed inset-0 bg-white/90 md:bg-white/90 z-10 pointer-events-none" />
               <Suspense fallback={null}>
                    <BackgroundShapes />
               </Suspense>
               {/* Heading */}

               <div className="text-center mb-2 md:mb-6 relative z-999 min-w-75 lg:min-w-325 min-h-27.5 lg:min-h-50 mx-auto">
                    <h1 className="text-center  text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px]  poiret-one-regular text-dark-black mt-14 md:mt-11 min-h-8.75 md:min-h-15 lg:min-h-18.75 2xl:min-h-22.5">
                         {h1Blogs.main_heading || 'The Growth Journal'}
                    </h1>
                    {/* leading-12 md:leading-15 lg:leading-21 2xl:leading-27.75 */}
                    <p className="text-dark-gray mt-1 md:mt-3 text-[12px] md:text-[18px] lg:text-[24px] leading-9">
                         Smart reads on marketing, design, and business growth.
                    </p>
               </div>

               {/* Featured Blog */}

               <div className="relative group flex flex-col md:flex items-center justify-center mb-5 md:mb-24 z-999 w-full md:w-142 lg:w-290 2xl:w-7xl mx-auto md:h-79.75 lg:h-163 2xl:h-180">

                    <img
                         src='/images/blog-thumbnail.webp'
                         srcSet="/images/blog-thumbnail-mobile.webp 480w, /images/blog-thumbnail.webp 800w"
                         sizes="(max-width: 767px) 100vw, 800px"
                         alt='The Growth Journal'
                         fetchPriority="high"
                         className="w-full md:w-142 lg:w-290 2xl:w-7xl object-cover h-48 md:h-79.75 lg:h-163 2xl:h-180 group-hover:scale-105 transition-all duration-500 ease-in-out md:ml-70 lg:ml-5"
                    />

                    {/* Floating card */}

                    <div className="block md:absolute relative -right-15 md:right-5 bottom-16 md:-bottom-10 bg-white shadow-[0_0_30px_rgba(0,0,0,0.12)] p-6 lg:p-10 w-[60%] md:w-61.25 lg:w-107.5 shrink-0 plus-jakarta-sans relative overflow-hidden animated-card md:min-h-45 xl:min-h-80 mt-4 md:mt-0">

                         <p className="text-[10px] lg:text-[16px] text-dark-gray mb-2 group-hover:text-white transition-all duration-300 ease-in-out">
                              22nd July, 2026 | 3 min read |
                              <span className="text-cust-orange group-hover:text-dark-black transition-all duration-300 ease-in-out"> Technology</span>
                         </p>

                         <h2 className="text-[15px] md:text-[18px] lg:text-[40px] text-dark-black leading-snug group-hover:text-white transition-all duration-300 ease-in-out">
                              {h3Blogs.blogs_heading_3 || 'Why Design Is the Most Powerful Business Tool You\'re Ignoring'}
                         </h2>

                    </div>

               </div>

               {/* Blog Grid */}


               <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 plus-jakarta-sans relative z-999">

                    {isLoading ? (
                         Array.from({ length: blogsPerPage }).map((_, index) => (
                              <div key={index} className="animate-pulse flex flex-col w-full">

                                   {/* Image Skeleton */}
                                   <div className="overflow-hidden min-h-55 max-h-55 w-full bg-slate-200/85"></div>

                                   {/* Meta Skeleton */}
                                   <div className="mt-3 flex gap-2 flex-wrap items-center">
                                        <div className="h-4 bg-slate-200/85 rounded w-16"></div>
                                        <span className="text-gray-300">|</span>
                                        <div className="h-4 bg-slate-200/85 rounded w-16"></div>
                                        <span className="text-gray-300">|</span>
                                        <div className="h-4 bg-slate-200/85 rounded w-20"></div>
                                   </div>

                                   {/* Title Skeleton */}
                                   <div className="mt-2 space-y-2">
                                        <div className="h-7 md:h-10 bg-slate-200/85 rounded w-11/12"></div>
                                        <div className="h-7 md:h-10 bg-slate-200/85 rounded w-2/3"></div>
                                   </div>

                              </div>
                         ))
                    ) : (
                         currentBlogs.map((blog, index) => (

                              <Link key={blog._id}
                                   to={`/${blog.slug}`}
                                   className="group cursor-pointer block">

                                   {/* Image */}

                                   <div className="overflow-hidden min-h-50 max-h-50">

                                        <OptimizedImage
                                             src={blog.image || blogImg}
                                             alt={blog?.alt || `The Growth Journal ${index + 1}`}
                                             width={500}
                                             height={220}
                                             aspectRatio="25:11"
                                             sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 40px), 386px"
                                             loading={index < 3 ? "eager" : "lazy"}
                                             className="w-full min-h-50 max-h-50 object-fill transition duration-500 group-hover:scale-105"
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

                              </Link>

                         ))
                    )}
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
               <Suspense fallback={null}>
                    <FaqSection paddings={'pt-10 pb-24 md:py-24 px-1 md:px-5'} faqData={faqData} />
               </Suspense>
          </section>
     );
};

export default Blogs;