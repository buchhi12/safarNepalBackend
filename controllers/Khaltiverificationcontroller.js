import axios from "axios";
import Package from "../models/packages.model.js";
import Payment from "../models/payment.model.js";

const KHALTI_PUBLIC_KEY = process.env.KHALTI_PUBLIC_KEY;   // for initiate
const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;   // for verify
const KHALTI_GATEWAY_URL = "https://a.khalti.com";
const BACKEND_URI = "http://localhost:3000";

// ------------------------------
// Initialize Khalti Payment
// ------------------------------
export const initializeKhaltiPaymentController = async (req, res) => {
  try {
    const { packageId } = req.body;

    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ success: false, message: "Package not found" });

    // Step 1: Call Khalti initiate API with PUBLIC key
    const payload = {
      return_url: `${BACKEND_URI}/api/khalti/verify`,
      
      
       public_key: "Live_public_key_137a1e37f5e94beeb0e65bb54df30c4f",
      website_url: BACKEND_URI,
      amount: pkg.price * 100,
      purchase_order_id: packageId,
      purchase_order_name: pkg.name,
      product_identity: packageId,
      product_name: pkg.name,
      mobile: "9800000000",
      transaction_pin: "1111"
    };

    const response = await axios.post(
      `${KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,
      payload,
      { headers: { Authorization: `Key ${KHALTI_PUBLIC_KEY}` } }
    );

    // Step 2: Save payment record
    const payment = await Payment.create({
      pidx: response.data.pidx,
      amount: pkg.price * 100,
      packageId,
      status: "pending"
    });

    res.json({
      success: true,
      message: "Khalti payment initialized",
      payment,
      khaltiData: response.data
    });

  } catch (error) {
    console.error("Error initializing Khalti payment:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to initialize Khalti payment",
      error: error.response?.data || error.message
    });
  }
};

// ------------------------------
// Verify Khalti Payment
// ------------------------------
export const completeKhaltiPaymentController = async (req, res) => {
  try {
    const { token, amount } = req.body;

    const verification = await axios.post(
      `${KHALTI_GATEWAY_URL}/api/v2/payment/verify/`,
      { token, amount },
      { headers: { Authorization: `Key ${KHALTI_SECRET_KEY}` } }
    );

    const data = verification.data;

    const payment = await Payment.findOne({ pidx: data.pidx });
    if (!payment) return res.status(404).json({ success: false, message: "Payment record not found" });

    payment.status = data.status === "Completed" ? "success" : "failed";
    payment.transactionId = data.transaction_id || "N/A";
    await payment.save();

    res.json({ success: true, message: "Payment verified", payment, verification: data });

  } catch (error) {
    console.error("Error verifying Khalti payment:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Error verifying Khalti payment",
      error: error.response?.data || error.message
    });
  }
};
