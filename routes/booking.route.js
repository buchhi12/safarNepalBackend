import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getUserBookings
 } from "../controllers/booking.controller.js";

const router = express.Router();

// POST - Create Booking
router.post("/", createBooking);

// GET - All Bookings
router.get("/", getBookings);

//get all user bookings
router.get("/",getUserBookings);
// GET - Single Booking by ID
router.get("/:id", getBookingById);

// PUT - Update Booking
router.put("/:id", updateBooking);

// DELETE - Delete Booking
router.delete("/:id", deleteBooking);

export default router;
