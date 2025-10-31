import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const reviewStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Reviews",                     // separate folder from packages
    allowed_formats: ["jpg","jpeg","png","webp","mp4"], 
    resource_type: "auto"                  // allows both images and videos
  }
});

const uploadReviewMedia = multer({ storage: reviewStorage });
export default uploadReviewMedia;
