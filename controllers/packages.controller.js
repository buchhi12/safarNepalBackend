import Package from "../models/packages.model.js";
import cloudinary from"../utils/cloudinary.js";
import upload from "../utils/multer.js";

// Create package (admin only)
export const createPackage = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create packages" });
    }
     // Cloudinary stores the uploaded file URL in req.file.path
    const image = req.file ? req.file.path : null;

    const arrayFields = ['itinerary', 'famousPlaces', 'trekkingDestinations', 'activities', 'includes', 'excludes'];

// Convert comma separated strings to arrays
const body = { ...req.body };
arrayFields.forEach(field => {
  if (body[field]) {
    body[field] = body[field]
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
});
    const newPackage = new Package({
      ...body,
      image,//cloudinary image url
      createdBy: req.user._id,
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get single package by ID
export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.status(200).json(pkg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
