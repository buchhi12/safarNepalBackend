import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
pidx: { type: String, required: true },
  amount: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  status: { type: String, default: "pending" },
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Payment", paymentSchema);
