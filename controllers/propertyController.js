import Property from '../models/Property.js';

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching properties" });
  }
};

export const postProperty = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, userId: req.user.id });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ msg: "Error posting property" });
  }
};
