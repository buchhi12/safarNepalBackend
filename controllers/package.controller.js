import Package from "../models/packages.model.js";

// Get all packages (just name, description, image)
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({}, "name description image"); // select only necessary fields
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages", error });
  }
};
