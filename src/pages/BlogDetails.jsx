import { useParams } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";;
import { lazy, Suspense, useEffect, useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
// import SeoTags from "../components/SeoTags";
import { getBlogBySlug } from "../utils/blogService";

const FaqSection = lazy(() => import('../components/FaqSection'))
const YouMayLike = lazy(() => import('../components/YouMayLike'))

const BlogDetails = () => {


     const { slug } = useParams();
     const [blog, setBlog] = useState(null);


     useEffect(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
     }, []);

     useEffect(() => {
          const fetchBlog = async () => {
               const data = await getBlogBySlug(slug);
               setBlog(data);
          };

          fetchBlog();
     }, [slug]);

     const optimizeImage = (url, width) => {
          if (!url) return "";
          return url.replace(
               "/upload/",
               `/upload/w_${width},c_fill,q_auto:eco,f_auto/`
          );
     };

     const blogDescription = blog?.seoDescription || blog?.content?.replace(/<[^>]+>/g, '').slice(0, 150) || 'Explore design, branding and marketing insights from Kreeya Design.';

     if (!blog) return null;


     return (
          <section className="px-4 md:px-10 lg:px-20 pt-20 pb-20 plus-jakarta-sans">

               <HomeNavbar />
               <Breadcrumb />

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
                         <img
                              fetchPriority="high"
                              loading="eager"
                              decoding="sync"
                              src={optimizeImage(blog.image, 640)}
                              srcSet={`
      ${optimizeImage(blog.image, 320)} 320w,
      ${optimizeImage(blog.image, 480)} 480w,
      ${optimizeImage(blog.image, 640)} 640w,
      ${optimizeImage(blog.image, 890)} 890w
    `}
                              sizes="(max-width: 768px) 100vw, 380px"
                              alt={blog.alt}
                              width={380}
                              height={252}
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

                    <FaqSection paddings={'px-0 pb-10 pt-10 md:pt-20'} />
               </Suspense>
          </section>
     );
};

export default BlogDetails;