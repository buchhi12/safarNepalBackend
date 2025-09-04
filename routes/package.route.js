import express from "express";
import auth from '../middlewareauthentication.js';
import { createPackage, getPackages, getPackageById } from "../controllers/packages.controller.js";


const router = express.Router();

// Admin only
router.post("/", auth("admin"), createPackage);

// Everyone can view
router.get("/", getPackages);
router.get("/:id", getPackageById);

export default router;
