const Plant = require("../model/plant_model.js");

module.exports = {
  addPlantApi: async function (req, res) {
    try {
      const image = req.file;

      if (!image) {
        return res.status(400).json({ message: "image is required" });
      }
      const newPlant = new Plant({
        plant_name: req.body.plant_name,
        plant_size: req.body.plant_size,
        plant_cost: req.body.plant_cost,
        plant_available: req.body.plant_available,
        imagePath: image.path, // Save the image path to the plant document
      });

      // Save the plant to the database
      await newPlant.save();
      res.status(201).json({
        id: newPlant._id,
        meesage: "plant added",
      });
    } catch (err) {
      res.status(500).json({ message: err.messagw });
    }
  },

  listPlantApi: async function (req, res) {
    try {
      const plants = await Plant.find({});
      res.status(201).json(plants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updatePlantApi: async function (req, res) {
    try {
      let { _id } = req.body;
      if (!_id) {
        return res.status(400).json({ message: "no plants id" });
      }

      let updateFields = { ...req.body };
      delete updateFields._id;

      const updatePlant = await Plant.updateOne(
        { _id },
        { $set: updateFields }
      );

      if (updatePlant === 0) {
        return res
          .status(404)
          .json({ status: "Plant not found or no changes made" });
      }
      res.json({ status: "Plant updated" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deletePlantApi: async function (req, res) {
    try {
      let id = req.query.id;

      if (!id) {
        return res.status(400).json({ message: "Plant ID is required" });
      }

      let result = await Plant.deleteOne({ _id: id });

      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
