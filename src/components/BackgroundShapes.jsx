import { useEffect, useRef } from "react";
import { loadGSAP } from "../utils/gsapLoader";

const shapes = [
     {
          type: "circle",
          class: "w-[150px] md:w-[350px] h-[150px] md:h-[350px] bg-orange-500/80 rounded-full",
          pos: { top: "5%", left: "-5%" },
     },
     {
          type: "circle",
          class: "w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-blue-900/80 rounded-full",
          pos: { top: "5%", right: "5%" },
     },
     {
          type: "circle",
          class: "w-[160px] md:w-[320px] h-[160px] md:h-[320px] bg-blue-900/80 rounded-full",
          pos: { bottom: "5%", left: "5%" },
     },
     {
          type: "circle",
          class: "w-[130px] md:w-[260px] h-[130px] md:h-[260px] bg-gray-400/60 rounded-full",
          pos: { bottom: "5%", right: "5%" },
     },
     {
          type: "circle",
          class: "w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-gray-400/60 backdrop-blur-2xl rounded-full z-50",
          pos: { bottom: "45%", right: "45%" },
     },
     {
          type: "circle",
          class: "w-[130px] md:w-[260px] h-[130px] md:h-[260px] bg-red-400/60 backdrop-blur-2xl rounded-full z-50",
          pos: { bottom: "45%", right: "45%" },
     },
     {
          type: "pin",
          pos: { bottom: "-28%", left: "40%" }
     },
     {
          type: "pin",
          pos: { bottom: "28%", right: "-10%" }
     },
     {
          type: "glassball",
          pos: { top: "-8%", left: "70%" }
     },
     {
          type: "glassball",
          pos: { bottom: "-8%", right: "70%" }
     },
     // triangles
     { type: "triangle", size: "w-10 h-10", color: "border-black bg-yellow-800" },
     { type: "triangle", size: "w-8 h-8", color: "border-gray-400 bg-orange-800" },
     { type: "triangle", size: "w-24 h-24", color: "border-black bg-black" },
     { type: "triangle", size: "w-10 h-10", color: "border-gray-300 bg-red-700" },
     { type: "triangle", size: "w-6 h-6", color: "border-black bg-blue-800" },
];

const BackgroundShapes = () => {
     const shapesRef = useRef([]);

     useEffect(() => {
          let animations = [];

          const initAnimations = async () => {
               const gsap = await loadGSAP();

               shapesRef.current.forEach((shape) => {
                    if (!shape) return;

                    const randomX = gsap.utils.random(-200, 200);
                    const randomY = gsap.utils.random(-200, 200);
                    const duration = gsap.utils.random(5, 10);

                    const animation = gsap.to(shape, {
                         x: randomX,
                         y: randomY,
                         rotation: gsap.utils.random(-180, 180),
                         duration: duration,
                         repeat: -1,
                         yoyo: true,
                         ease: "sine.inOut",
                    });

                    animations.push(animation);
               });
          };

          initAnimations();

          return () => {
               animations.forEach(animation => {
                    if (animation) animation.kill();
               });
          };
     }, []);

     return (
          <div className="fixed inset-0 overflow-hidden z-0">
               {shapes.map((shape, i) => {
                    const baseStyle = shape.pos;

                    if (shape.type === "circle") {
                         return (
                              <div
                                   key={i}
                                   ref={(el) => (shapesRef.current[i] = el)}
                                   className={`absolute ${shape.class}`}
                                   style={baseStyle}
                              />
                         );
                    }
                    if (shape.type === "pin") {
                         return (
                              <div
                                   key={i}
                                   ref={(el) => (shapesRef.current[i] = el)}
                                   className="absolute"
                                   style={baseStyle}
                              >
                                   <PinShape />
                              </div>
                         );
                    }
                    if (shape.type === "glassball") {
                         return (
                              <div
                                   key={i}
                                   ref={(el) => (shapesRef.current[i] = el)}
                                   className="absolute z-50"
                                   style={baseStyle}
                              >
                                   <GlassBall />
                              </div>
                         );
                    }

                    // triangle
                    return (
                         <div
                              key={i}
                              ref={(el) => (shapesRef.current[i] = el)}
                              className="absolute"
                              style={{
                                   ...baseStyle,
                                   width: 0,
                                   height: 0,
                                   borderLeft: "32px solid transparent",
                                   borderRight: "32px solid transparent",
                                   borderBottom: "40px solid black",
                              }}
                         />
                    );
               })}
          </div>
     );
};

export default BackgroundShapes;


const PinShape = () => {
     return (
          <div className="relative w-27.5 md:w-65 h-50 md:h-105">

               {/* Shape */}
               <div
                    className="absolute inset-0 "
                    style={{
                         clipPath:
                              "path('M130 0C60 0 0 60 0 130C0 230 130 420 130 420C130 420 260 230 260 130C260 60 200 0 130 0Z')",
                    }}
               />

               {/* Dots */}
               <div
                    className="absolute inset-0"
                    style={{
                         clipPath:
                              "path('M130 0C60 0 0 60 0 130C0 230 130 420 130 420C130 420 260 230 260 130C260 60 200 0 130 0Z')",
                         backgroundImage:
                              "radial-gradient(circle, #cfcfcf 6px, transparent 1px)",
                         backgroundSize: "30px 30px",
                    }}
               />

          </div>
     );
};

const GlassBall = ({ id = "lens" }) => {
     return (
          <div
               className="w-25 md:w-50 h-25 md:h-50 rounded-full relative overflow-hidden"
               style={{
                    border: "1.5px solid rgba(255,255,255,0.45)",
                    boxShadow:
                         "0 10px 40px rgba(0,0,0,0.45), inset 0 12px 14px rgba(255,255,255,0.4)",
               }}
          >
               {/* DISTORTION FILTER */}
               <svg width="0" height="0" style={{ position: "absolute" }}>
                    <defs>
                         <filter
                              id={`lens-${id}`}
                              x="-20%"
                              y="-20%"
                              width="200%"
                              height="200%"
                              colorInterpolationFilters="sRGB"
                         >
                              {/* radial displacement map */}
                              <feImage
                                   result="map"
                                   xlinkHref="data:image/svg+xml;utf8,\
              <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>\
              <radialGradient id='g' cx='50%' cy='50%' r='50%'>\
              <stop offset='0%' stop-color='rgb(255,255,255)'/>\
              <stop offset='70%' stop-color='rgb(128,128,128)'/>\
              <stop offset='100%' stop-color='rgb(0,0,0)'/>\
              </radialGradient>\
              <rect width='200' height='200' fill='url(%23g)'/>\
              </svg>"
                              />

                              <feDisplacementMap
                                   in="SourceGraphic"
                                   in2="map"
                                   scale="40"
                                   xChannelSelector="R"
                                   yChannelSelector="G"
                              />
                         </filter>
                    </defs>
               </svg>

               {/* BACKDROP DISTORTION */}
               <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                         backdropFilter:
                              "blur(3px) saturate(160%) contrast(110%) brightness(115%)",
                         WebkitBackdropFilter:
                              "blur(3px) saturate(160%) contrast(110%) brightness(115%)",
                         filter: `url(#lens-${id})`,
                         transform: "scale(1.25)",
                         borderRadius: "50%",
                    }}
               />

               {/* glass highlight */}
               <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                         background:
                              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 60%)",
                    }}
               />

               {/* specular reflection */}
               <div
                    className="absolute pointer-events-none"
                    style={{
                         top: "8%",
                         left: "20%",
                         width: "40%",
                         height: "18%",
                         background: "rgba(255,255,255,0.6)",
                         filter: "blur(8px)",
                         borderRadius: "50%",
                    }}
               />

               {/* inner shadow */}
               <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                         boxShadow:
                              "inset 0 -10px 25px rgba(0,0,0,0.25), inset 0 4px 12px rgba(255,255,255,0.1)",
                         borderRadius: "50%",
                    }}
               />
          </div>
     );
};
