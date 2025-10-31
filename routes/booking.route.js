import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getUserBookings
 } from "../controllers/booking.controller.js";
import auth from '../middlewareauthentication.js';
const router = express.Router();

// POST - Create Booking
router.post("/:packageId",auth(), createBooking);

// GET - All Bookings
router.get("/",auth(), getBookings);

//get all user bookings
router.get("/user",auth(), getUserBookings);

// GET - Single Booking by ID
router.get("/:id",auth(), getBookingById);

// PUT - Update Booking
router.put("/:id",auth(), updateBooking);

// DELETE - Delete Booking
router.delete("/:id",auth(), deleteBooking);

export default router;
