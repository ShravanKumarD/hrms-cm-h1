const db = require("../models");
const UserRelievingLetter = db.userRelievingLetter;
const User = db.user;

// Create a new Relieving Letter
exports.createRelievingLetter = async (req, res) => {
  try {
    const {
      userId,
      date,
      employee_name,
      employee_address,
      employee_id,
      position,
      department,
      date_of_joining,
      date_of_relieving,
      hr_name,
      company_name,
    } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required." });
    }

    const relievingLetter = await UserRelievingLetter.create({
      userId,
      date,
      employee_name,
      employee_address,
      employee_id,
      position,
      department,
      date_of_joining,
      date_of_relieving,
      hr_name,
      company_name,
    });

    res.status(201).send(relievingLetter);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve all Relieving Letters
exports.findAll = async (req, res) => {
  try {
    const relievingLetters = await UserRelievingLetter.findAll();
    res.status(200).send(relievingLetters);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve a single Relieving Letter by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const relievingLetter = await UserRelievingLetter.findByPk(id);
    if (!relievingLetter) {
      return res.status(404).send({ message: "Relieving letter not found." });
    }
    res.status(200).send(relievingLetter);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a Relieving Letter by id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await UserRelievingLetter.update(req.body, { where: { id } });

    if (updated) {
      const updatedRelievingLetter = await UserRelievingLetter.findByPk(id);
      res.status(200).send(updatedRelievingLetter);
    } else {
      res.status(404).send({ message: "Relieving letter not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a Relieving Letter by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await UserRelievingLetter.destroy({ where: { id } });

    if (deleted) {
      res.status(200).send({ message: "Relieving letter deleted successfully." });
    } else {
      res.status(404).send({ message: "Relieving letter not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
