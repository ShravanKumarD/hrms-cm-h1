const db = require("../models");
const UserHikeLetter = db.userHikeLetter;
const User = db.user;

// Create a new Hike Letter
exports.createHikeLetter = async (req, res) => {
  try {
    const {
      userId,
      date,
      name,
      place,
      effective_date,
      new_salary,
      previous_salary,
      hr_name,
    } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required." });
    }

    // Check if a hike letter with the same data already exists
    const existingHikeLetter = await UserHikeLetter.findOne({
      where: {
        userId,
        date,
        name,
        place,
        effective_date,
        new_salary,
        previous_salary,
        hr_name,
      },
    });

    if (existingHikeLetter) {
      return res.status(200).send({
        message:
          "No changes were made as the data is identical to the existing record.",
      });
    }

    const hikeLetter = await UserHikeLetter.create({
      userId,
      date,
      name,
      place,
      effective_date,
      new_salary,
      previous_salary,
      hr_name,
    });

    res.status(201).send(hikeLetter);
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while creating the hike letter.",
      error: error.message,
      stack: error.stack,
    });
  }
};

// Retrieve all Hike Letters
exports.findAll = async (req, res) => {
  try {
    const hikeLetters = await UserHikeLetter.findAll();
    res.status(200).send(hikeLetters);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve a single Hike Letter by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const hikeLetter = await UserHikeLetter.findByPk(id);
    if (!hikeLetter) {
      return res.status(404).send({ message: "Hike letter not found." });
    }
    res.status(200).send(hikeLetter);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a Hike Letter by id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await UserHikeLetter.update(req.body, { where: { id } });

    if (updated) {
      const updatedHikeLetter = await UserHikeLetter.findByPk(id);
      res.status(200).send(updatedHikeLetter);
    } else {
      res.status(404).send({ message: "Hike letter not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a Hike Letter by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await UserHikeLetter.destroy({ where: { id } });

    if (deleted) {
      res.status(200).send({ message: "Hike letter deleted successfully." });
    } else {
      res.status(404).send({ message: "Hike letter not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
