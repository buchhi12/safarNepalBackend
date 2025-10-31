import express from "express";
import { initializeKhaltiPaymentController, completeKhaltiPaymentController } from "../controllers/Khaltiverificationcontroller.js";

const router = express.Router();

router.post("/initiate", initializeKhaltiPaymentController);  // frontend calls this first
router.post("/verify", completeKhaltiPaymentController);       // frontend sends token to verify

export default router;
