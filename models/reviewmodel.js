import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  comment: { type: String, required: true },
  images: [String],
  videos: [String],
  createdAt: { type: Date, default: Date.now },
});
const Review = mongoose.model("Review",reviewSchema);
export default Review;
