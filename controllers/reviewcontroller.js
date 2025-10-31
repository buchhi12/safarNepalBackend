import Review from '../models/reviewmodel.js';
import Booking from '../models/booking.model.js';
import uploadReviewMedia from "../utils/multer1.js";
// ✅ Create review (only for users who booked the package, handles images/videos)
export const createReview = async (req, res) => {
  console.log("Route hit: createReview");

  const { packageId, comment } = req.body;
  const userId = req.user._id;

  try {
    // Check if user has booked this package
    const booked = await Booking.findOne({ user: userId, package: packageId });
    if (!booked) {
      return res.status(403).json({ message: "You must book the package to write a review" });
    }

    // Extract uploaded images/videos from multer (Cloudinary URLs)
    const images = req.files?.images?.map(file => file.path) || [];
    const videos = req.files?.videos?.map(file => file.path) || [];

    // Create the review
    const review = new Review({
      user: userId,
      package: packageId,
      comment,
      images,
      videos,
    });

    await review.save();
    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all reviews for a specific package
export const getReviewsForPackage = async (req, res) => {
  const { packageId } = req.params;
  try {
    const reviews = await Review.find({ package: packageId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get latest reviews for landing page
export const getLatestReviews = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  try {
    const reviews = await Review.find()
      .populate('user', 'name')
      .populate('package', 'name') // optional: include package info
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching latest reviews:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
