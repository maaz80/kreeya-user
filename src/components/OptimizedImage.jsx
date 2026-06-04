// components/OptimizedImage.jsx
import { useMemo } from 'react';

/**
 * OptimizedImage - A high-performance image component that leverages Cloudinary's dynamic API
 * to serve perfectly resized, formatted, and compressed responsive images with zero Cumulative Layout Shift (CLS).
 *
 * @param {string} src - The image source URL (local asset or Cloudinary URL)
 * @param {string} alt - Alternate description for accessibility
 * @param {string} className - Tailwind or custom CSS classes
 * @param {string} loading - Image loading strategy ("lazy" | "eager")
 * @param {string|number} width - Expected width (helps browser reserve space and Cloudinary resize)
 * @param {string|number} height - Expected height (helps browser reserve space and Cloudinary crop)
 * @param {string|number} aspectRatio - Enforce specific aspect ratio (e.g. "16:9", "1:1", or numeric 1.77)
 * @param {string} crop - Cloudinary crop mode (default: "fill" if ratio/dimensions are present, else "scale")
 * @param {string} gravity - Cloudinary gravity mode (default: "auto" for AI focal point detection)
 * @param {string} sizes - Custom responsive sizes query for srcSet selection
 * @param {object} style - Custom inline styles
 */
const OptimizedImage = ({
     src,
     alt = '',
     className = '',
     loading = 'lazy',
     width,
     height,
     aspectRatio,
     crop = 'fill',
     gravity = 'auto',
     sizes,
     style,
     ...props
}) => {
     // Extract the clean Cloudinary Public ID and details
     const cloudinaryData = useMemo(() => {
          if (!src || typeof src !== 'string') return { isCloudinary: false, cleanPath: src };

          if (src.includes('cloudinary.com')) {
               const parts = src.split('/upload/');
               if (parts.length >= 2) {
                    const pathSegments = parts[1].split('/');
                    
                    // Filter out transformation segments and version segments
                    const cleanSegments = pathSegments.filter(segment => {
                         // Version segment (e.g., v1716447812 or v1)
                         if (/^v\d+$/.test(segment)) {
                              return false;
                         }
                         // Transformation segment (contains comma, or starts with common codes)
                         if (segment.includes(',') || 
                             segment.startsWith('w_') || 
                             segment.startsWith('h_') || 
                             segment.startsWith('c_') || 
                             segment.startsWith('q_') || 
                             segment.startsWith('f_') || 
                             segment.startsWith('dpr_') || 
                             segment.startsWith('r_')) {
                              return false;
                         }
                         return true;
                    });
                    
                    return {
                         isCloudinary: true,
                         cleanPath: cleanSegments.join('/'),
                         cloudName: src.split('res.cloudinary.com/')[1]?.split('/')[0] || 'dlek2xgkd'
                    };
               }
          }
          return { isCloudinary: false, cleanPath: src };
     }, [src]);

     // Parse aspect ratio dynamically
     const ratio = useMemo(() => {
          if (aspectRatio) {
               if (typeof aspectRatio === 'number') return aspectRatio;
               if (typeof aspectRatio === 'string') {
                    if (aspectRatio.includes(':')) {
                         const [w, h] = aspectRatio.split(':').map(Number);
                         if (w && h) return w / h;
                    } else if (aspectRatio.includes('/')) {
                         const [w, h] = aspectRatio.split('/').map(Number);
                         if (w && h) return w / h;
                    } else {
                         const val = Number(aspectRatio);
                         if (!isNaN(val)) return val;
                    }
               }
          }
          if (width && height) {
               const w = Number(width);
               const h = Number(height);
               if (w && h) return w / h;
          }
          return null;
     }, [aspectRatio, width, height]);

     // Generate high-performance fallback src and responsive srcSet
     const { finalSrc, finalSrcSet } = useMemo(() => {
          if (!cloudinaryData.isCloudinary || !cloudinaryData.cleanPath) {
               return { finalSrc: src, finalSrcSet: undefined };
          }

          const { cleanPath, cloudName } = cloudinaryData;
          const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

          // Generate primary fallback src
          let fallbackTrans = [];
          if (width && height) {
               fallbackTrans.push(`w_${width}`, `h_${height}`, `c_${crop}`, `g_${gravity}`);
          } else if (width) {
               fallbackTrans.push(`w_${width}`, `c_scale`);
          } else if (height) {
               fallbackTrans.push(`h_${height}`, `c_scale`);
          } else {
               fallbackTrans.push('w_1024', 'c_scale'); // High-quality default desktop size
          }
          fallbackTrans.push('f_avif', 'q_auto:eco');
          const finalSrc = `${baseUrl}/${fallbackTrans.join(',')}/${cleanPath}`;

          // Generate srcSet (Retina-optimized if width is specified, otherwise viewport-responsive)
          let widths = [];
          if (width) {
               const w = Number(width);

               widths = [
                    Math.round(w * 0.5),
                    Math.round(w * 0.75),
                    w,
                    Math.round(w * 1.5),
                    w * 2,
               ]
                    .filter(v => v <= 2560)
                    .filter((v, i, arr) => arr.indexOf(v) === i);
          } else {
               widths = [320, 480, 640, 768, 1024, 1280, 1600, 2000];
          }

          const srcSetParts = widths.map(w => {
               let trans = [`w_${w}`];
               
               if (ratio) {
                    const h = Math.round(w / ratio);
                    trans.push(`h_${h}`);
                    trans.push(`c_${crop}`);
                    trans.push(`g_${gravity}`);
               } else if (height && width) {
                    const h = Math.round(w * (Number(height) / Number(width)));
                    trans.push(`h_${h}`);
                    trans.push(`c_${crop}`);
                    trans.push(`g_${gravity}`);
               } else {
                    trans.push('c_scale');
               }
               
               trans.push('f_avif', 'q_auto:eco');
               return `${baseUrl}/${trans.join(',')}/${cleanPath} ${w}w`;
          });

          const finalSrcSet = srcSetParts.join(', ');

          return { finalSrc, finalSrcSet };
     }, [cloudinaryData, width, height, ratio, crop, gravity, src]);

     // Setup responsive sizes attribute
     const finalSizes = useMemo(() => {
          if (sizes) return sizes;
          if (width) return `${width}px`;
          return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
     }, [sizes, width]);

     // Combine dynamic styles (e.g. aspect ratio) to enforce space and eliminate CLS
     const finalStyle = useMemo(() => {
          const baseStyle = {};
          if (ratio) {
               baseStyle.aspectRatio = ratio.toString();
               baseStyle.objectFit = style?.objectFit || 'cover';
          }
          return { ...baseStyle, ...style };
     }, [ratio, style]);

     if (!src) return null;

     return (
          <img
               src={finalSrc}
               srcSet={finalSrcSet}
               sizes={finalSrcSet ? finalSizes : undefined}
               alt={alt}
               decoding="async"
               fetchPriority={loading === 'eager' ? 'high' : 'auto'}
               className={className}
               loading={loading}
               width={width}
               height={height}
               style={finalStyle}
               {...props}
          />
     );
};

export default OptimizedImage;