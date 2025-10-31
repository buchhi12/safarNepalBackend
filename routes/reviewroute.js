import express from 'express';
import { createReview, getReviewsForPackage, getLatestReviews } from '../controllers/reviewcontroller.js';
import auth from '../middlewareauthentication.js';
import uploadReviewMedia from "../utils/multer1.js";

const router = express.Router();

// POST review (only for logged-in users who booked the package)
router.post('/',auth(),uploadReviewMedia.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 2 }
  ]),createReview
);


// GET all reviews for a package
router.get('/package/:packageId', getReviewsForPackage);

// GET latest reviews for landing page teaser
router.get('/latest', getLatestReviews);

export default router;
