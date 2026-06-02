import { useParams } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";;
import { lazy, Suspense, useEffect, useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
// import SeoTags from "../components/SeoTags";
import { getBlogBySlug } from "../utils/blogService";
import useFaq from "../hooks/useFaq";
import OptimizedImage from "../components/OptimizedImage";
import { Helmet } from "react-helmet-async";
import staticData from "../data/staticData.json";

const FaqSection = lazy(() => import('../components/FaqSection'))
const YouMayLike = lazy(() => import('../components/YouMayLike'))

const BlogDetails = () => {

     const { faqData } = useFaq('blogs-details');
     const { slug, itemSlug } = useParams();
     const blogSlug = slug || itemSlug;
     const localBlog = (staticData.blogs || []).find((b) => b.slug === blogSlug);
     const [blog, setBlog] = useState(localBlog || null);


     useEffect(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
     }, []);

     useEffect(() => {
          const fetchBlog = async () => {
               if (blogSlug) {
                    const data = await getBlogBySlug(blogSlug);
                    setBlog(data);
               }
          };

          fetchBlog();
     }, [blogSlug]);

     const optimizeImage = (url, width) => {
          if (!url) return "";
          return url.replace(
               "/upload/",
               `/upload/w_${width},c_fill,q_auto:eco,f_auto/`
          );
     };

     const blogDescription = blog?.seoDescription || blog?.content?.replace(/<[^>]+>/g, '').slice(0, 150) || 'Explore design, branding and marketing insights from Kreeya Design.';

     return (
          <section className="px-4 md:px-10 lg:px-20 pt-20 pb-20 plus-jakarta-sans">
               <Helmet>
                    {blog && blog.image && (
                         <link
                              rel="preload"
                              as="image"
                              href={optimizeImage(blog.image, 1330)}
                         />
                    )}
               </Helmet>

               <HomeNavbar />
               <Breadcrumb />

               {!blog ? (
                    <div className="animate-pulse">
                         {/* Title Skeleton */}
                         <div className="mx-auto mt-8 h-10 md:h-16 lg:h-24 bg-slate-200/85 rounded-sm w-4/5 max-w-[1000px] mb-6 pt-8"></div>

                         {/* Meta Skeleton */}
                         <div className="mx-auto h-4 bg-slate-200/85 rounded-sm w-1/3 max-w-[280px] mt-4 md:mt-0 mb-4 md:mb-10"></div>

                         {/* Image Skeleton */}
                         <div className="w-full max-w-332.5 h-50 md:h-90 lg:h-180 bg-slate-200/85 rounded-md mx-auto mb-10"></div>

                         {/* Content Skeleton */}
                         <div className="max-w-275 mx-auto space-y-4 mb-16">
                              <div className="h-4 bg-slate-200/85 rounded-sm w-full"></div>
                              <div className="h-4 bg-slate-200/85 rounded-sm w-11/12"></div>
                              <div className="h-4 bg-slate-200/85 rounded-sm w-10/12"></div>
                              <div className="h-4 bg-slate-200/85 rounded-sm w-5/6"></div>
                              <div className="h-4 bg-slate-200/85 rounded-sm w-3/4"></div>
                         </div>
                    </div>
               ) : (
                    <>
                         {/* Title */}

                         <h1 className="text-center leading-11 md:leading-15 lg:leading-21 2xl:leading-27.75 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] poiret-one-regular text-dark-black pt-8 min-h-[100px] md:min-h-[150px]">

                              {blog.title ? blog.title : '5 Mistakes Startups Make in Branding'}

                         </h1>

                         {/* Meta */}

                         <p className="text-center text-dark-gray mb-4 md:mb-10 mt-4 md:mt-0 min-h-[15px] md:min-h-[20px]">

                              {blog.date ? blog.date : '2026-03-18'} | {blog.read ? blog.read : '5'} min read |{" "}
                              <span className="text-cust-orange">

                                   {blog.category ? blog.category : 'Technology'}

                              </span>

                         </p>

                         {/* Image */}

                         <div className="mb-10">

                              {blog && (
                                   <OptimizedImage
                                        src={blog.image}
                                        alt={blog.alt}
                                        width={776}
                                        height={350}
                                        aspectRatio="133:60"
                                        sizes="(max-width: 768px) 100vw, 1330px"
                                        loading="eager"
                                        className="w-full max-w-[1330px] h-50 md:h-90 lg:h-180 object-cover rounded-md mx-auto"
                                   />
                              )}

                         </div>

                         {/* Content */}

                         <div
                              className="text-dark-black/75 leading-5 lg:leading-8 blog-content"
                              dangerouslySetInnerHTML={{ __html: blog.content }}
                         />
                         <Suspense fallback={<div className="min-h-40" />}>
                              <YouMayLike />

                              <FaqSection paddings={'px-0 pb-10 pt-10 md:pt-20'} faqData={faqData} />
                         </Suspense>
                    </>
               )}
          </section>
     );
};

export default BlogDetails;