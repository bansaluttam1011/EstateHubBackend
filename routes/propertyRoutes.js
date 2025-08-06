import express from "express";
import Property from "../models/Property.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ Use the imported one

const router = express.Router();

// POST: Add property
router.post("/", verifyToken, async (req, res) => {
  const {
    title,
    description,
    price,
    location,
    images,
    type,
    propertyType,
    bedrooms,
    bathrooms,
    area,
    furnishing,
    amenities
  } = req.body;

  try {
    const newProperty = new Property({
      title,
      description,
      price,
      location,
      images,
      type,
      propertyType,
      bedrooms,
      bathrooms,
      area,
      furnishing,
      amenities,
      owner: req.userId
    });

    await newProperty.save();
    res.status(201).json({ msg: "Property listed", property: newProperty });
  } catch (err) {
    res.status(500).json({ msg: "Failed to add property", error: err.message });
  }
});

// GET: All properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().populate("owner", "name email");
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch properties", error: err.message });
  }
});

export default router;
