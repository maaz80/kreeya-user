// utils/cloudinaryUtils.js

const CLOUD_NAME = "dlek2xgkd";

// Cloudinary URL se clean public ID nikalo
export const getCleanPath = (src) => {
     if (!src?.includes("cloudinary.com")) return null;

     const parts = src.split("/upload/");
     if (parts.length < 2) return null;

     const cloudName = src.split("res.cloudinary.com/")[1]?.split("/")[0];
     const cleanSegments = parts[1].split("/").filter((seg) => {
          if (/^v\d+$/.test(seg)) return false;
          if (
               seg.includes(",") ||
               seg.startsWith("w_") ||
               seg.startsWith("h_") ||
               seg.startsWith("c_") ||
               seg.startsWith("q_") ||
               seg.startsWith("f_") ||
               seg.startsWith("dpr_") ||
               seg.startsWith("r_")
          )
               return false;
          return true;
     });

     return { cleanPath: cleanSegments.join("/"), cloudName };
};

// Single URL build karo
export const buildCloudinaryUrl = (src, { w, h, crop = "fill", gravity = "auto" } = {}) => {
     const data = getCleanPath(src);
     if (!data) return src;

     const { cleanPath, cloudName } = data;
     const base = `https://res.cloudinary.com/${cloudName}/image/upload`;
     const trans = [`w_${w}`, `h_${h}`, `c_${crop}`, `g_${gravity}`, "f_avif", "q_auto:eco"];

     return `${base}/${trans.join(",")}/${cleanPath}`;
};

// srcSet build karo — same jo OptimizedImage karta hai
export const buildSrcSet = (src, { crop = "fill", gravity = "auto" } = {}) => {
     const data = getCleanPath(src);
     if (!data) return "";

     const { cleanPath, cloudName } = data;
     const base = `https://res.cloudinary.com/${cloudName}/image/upload`;
     const widths = [388, 582, 776, 1164, 1552];

     return widths
          .map((w) => {
               const h = Math.round(w * (350 / 776)); // Exactly matching 776x350 aspect ratio
               const trans = [`w_${w}`, `h_${h}`, `c_${crop}`, `g_${gravity}`, "f_avif", "q_auto:eco"];
               return `${base}/${trans.join(",")}/${cleanPath} ${w}w`;
          })
          .join(", ");
};