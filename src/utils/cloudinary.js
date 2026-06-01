// utils/imageOptimizer.js
const CLOUDINARY_BASE = 'https://res.cloudinary.com/dlek2xgkd/image/upload';

export const optimizeImage = (url, width = 1200, aspectRatio = null) => {
     if (!url || typeof url !== 'string') return url;

     // Clean the URL
     let cleanPath = url;

     if (url.includes('cloudinary.com')) {
          if (url.includes('/upload/')) {
               let parts = url.split('/upload/');
               let pathPart = parts[parts.length - 1];

               // Remove existing transformations (anything with commas)
               if (pathPart.includes(',')) {
                    const match = pathPart.match(/[^,]+$/);
                    if (match) pathPart = match[0];
               }

               // Remove version numbers (v123...)
               pathPart = pathPart.replace(/^v\d+\//, '');

               cleanPath = pathPart;
          } else {
               return url;
          }
     }

     // Remove leading/trailing slashes
     cleanPath = cleanPath.replace(/^\/+|\/+$/g, '');

     const arTransform = aspectRatio ? `ar_${aspectRatio},c_fill,g_auto,` : '';
     return `${CLOUDINARY_BASE}/${arTransform}q_auto:eco,f_auto,w_${width}/${cleanPath}`;
};

export const getResponsiveImageProps = (url, options = {}) => {
     const {
          mobileWidth = 300,
          tabletWidth = 500,
          desktopWidth = 1000,
          fallbackWidth = 500
     } = options;

     if (!url || typeof url !== 'string') return { src: url };

     // Clean path
     let cleanPath = url;
     if (url.includes('cloudinary.com') && url.includes('/upload/')) {
          let parts = url.split('/upload/');
          let pathPart = parts[parts.length - 1];
          if (pathPart.includes(',')) {
               const match = pathPart.match(/[^,]+$/);
               if (match) pathPart = match[0];
          }
          pathPart = pathPart.replace(/^v\d+\//, '');
          cleanPath = pathPart.replace(/^\/+|\/+$/g, '');
     }

     return {
          src: `${CLOUDINARY_BASE}/q_auto:eco,f_auto,w_${fallbackWidth}/${cleanPath}`,
          srcSet: [
               `${CLOUDINARY_BASE}/q_auto:eco,f_auto,w_${mobileWidth}/${cleanPath} ${mobileWidth}w`,
               `${CLOUDINARY_BASE}/q_auto:eco,f_auto,w_${tabletWidth}/${cleanPath} ${tabletWidth}w`,
               `${CLOUDINARY_BASE}/q_auto:eco,f_auto,w_${desktopWidth}/${cleanPath} ${desktopWidth}w`
          ].join(', '),
          sizes: '(max-width: 640px) 300px, (max-width: 1024px) 500px, 1000px'
     };
};
// Video optimization (keep as is)
export const optimizeVideo = (url) => {
     if (!url || typeof url !== "string") return url;

     return url.replace(
          "/upload/",
          "/upload/q_auto,f_auto,vc_auto/"
     );
};