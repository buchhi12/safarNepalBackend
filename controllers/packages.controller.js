import Package from "../models/packages.model.js";

// Create package (admin only)
export const createPackage = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create packages" });
    }

    const newPackage = new Package({
      ...req.body,
      createdBy: req.user.id,
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
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
    res.status(500).json({ message: err.message });
  }
};
