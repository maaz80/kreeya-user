import { useEffect, useState } from "react";
import { getBlogs } from "../../utils/blogService";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../OptimizedImage";
import { useH2Data } from "../../hooks/useH2data";


const GrowthJournal = () => {
     const [blogs, setBlogs] = useState([])
     const navigate = useNavigate()
     const h2Home = useH2Data()
     useEffect(() => {

          const fetchBlogs = async () => {

               const data = await getBlogs();
               setBlogs(data.slice(0, 3));

          };

          fetchBlogs();

     }, []);

     const createSlug = (title) => {
          return title
               .toLowerCase()
               .trim()
               .replace(/[^a-z0-9\s]/g, "")
               .replace(/\s+/g, "_");
     };

     return (
          <section className="relative z-999 px-4 lg:px-20 pb-10 pt-12 md:pt-18">

               <div className="max-w-450 mx-auto">

                    {/* Heading */}

                    <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-4 md:mb-16 poiret-one-regular">
                         {h2Home.growth_journal || 'The Growth Journal'}
                    </h2>

                    {/* Blog Grid */}

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 plus-jakarta-sans">

                         {blogs.map((blog) => (

                              <div key={blog._id} onClick={() => navigate(`/${blog.slug}`)} className="group cursor-pointer">

                                   {/* Image */}

                                   <div className="overflow-hidden">

                                        <OptimizedImage
                                             src={blog.image}
                                             alt={blog.alt}
                                             width="400"
                                             height="250"
                                             className=" w-full h-55 object-fill transition duration-500 group-hover:scale-105 "
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

                                   <h3 className="mt-2 text-[18px] md:text-[32px] leading-6 md:leading-10 text-[#0a2742] group-hover:text-orange-500 transition">

                                        {blog.title}

                                   </h3>

                              </div>

                         ))}

                    </div>


               </div>

          </section>
     );
};

export default GrowthJournal;