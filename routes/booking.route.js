import express from "express";
import Package from "../models/packages.model.js";
import auth from '../middlewareauthentication.js';
import {
  createBookingForPackage, 
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getUserBookings
} from "../controllers/booking.controller.js";

const router = express.Router();

//router.post("/:packageId/book", createBookingForPackage);


// POST booking for a specific package
router.post("/:packageId/book", auth, createBookingForPackage);

// GET all bookings (admin only)
router.get("/", auth, getBookings);

// GET bookings for logged-in user
router.get("/my-bookings", auth, getUserBookings);

// GET single booking by ID
router.get("/:id", auth, getBookingById);

// PUT - Update Booking
router.put("/:id", auth, updateBooking);

// DELETE - Delete Booking
router.delete("/:id", auth, deleteBooking);

export default router;
