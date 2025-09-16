import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import Package from "../models/packages.model.js";

export const createBooking = async (req, res) => {
  try {
    const { packageId } = req.params;
    const { name, email, phone, country } = req.body;

    // Validate packageId
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({ message: "Invalid package ID" });
    }

    // Validate request body
    if (!name || !email || !phone || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: user not found in request" });
    }

    const newBooking = new Booking({
      name,
      email,
      phone,
      country,
      package: pkg._id,
      packageName: pkg.name,
      price: pkg.price,
      user: req.user._id   // ✅ use normalized _id
      //user:null
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Error creating booking", error: err.message });
  }
};

// ✅ Get All Bookings (Admin Only, with pagination)
export const getBookings = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { page = 1, limit = 20 } = req.query;
    const bookings = await Booking.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// ✅ Get Bookings for Logged-in User
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user bookings", error: error.message });
  }
};

// ✅ Get Single Booking by ID (with ownership check)
export const getBookingById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.user.role !== "admin" && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied. You can only view your own bookings." });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error: error.message });
  }
};

// ✅ Update Booking (only owner or admin)
export const updateBooking = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.user.role !== "admin" && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: Cannot update others' bookings" });
    }

    Object.assign(booking, req.body);
    await booking.save();

    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error: error.message });
  }
};

// ✅ Delete Booking (only owner or admin)
export const deleteBooking = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.user.role !== "admin" && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: Cannot delete others' bookings" });
    }

    await booking.deleteOne();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
};
