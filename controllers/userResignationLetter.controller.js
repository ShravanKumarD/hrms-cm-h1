const db = require("../models");
const UserResignationLetter = db.userResignationLetter;

// Create a new Resignation Letter
exports.createResignationLetter = async (req, res) => {
  try {
    const {
      userId,
      date,
      recipient_name,
      recipient_position,
      company_name,
      company_address,
      your_position,
      last_working_day,
      your_name,
    } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required." });
    }

    const resignationLetter = await UserResignationLetter.create({
      userId,
      date,
      recipient_name,
      recipient_position,
      company_name,
      company_address,
      your_position,
      last_working_day,
      your_name,
    });

    res.status(201).send(resignationLetter);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve all Resignation Letters
exports.findAll = async (req, res) => {
  try {
    const resignationLetters = await UserResignationLetter.findAll();
    res.status(200).send(resignationLetters);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve a single Resignation Letter by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const resignationLetter = await UserResignationLetter.findByPk(id);
    if (!resignationLetter) {
      return res.status(404).send({ message: "Resignation letter not found." });
    }
    res.status(200).send(resignationLetter);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a Resignation Letter by id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await UserResignationLetter.update(req.body, {
      where: { id },
    });

    if (updated) {
      const updatedResignationLetter = await UserResignationLetter.findByPk(id);
      res.status(200).send(updatedResignationLetter);
    } else {
      res.status(404).send({ message: "Resignation letter not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a Resignation Letter by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await UserResignationLetter.destroy({ where: { id } });

    if (deleted) {
      res
        .status(200)
        .send({ message: "Resignation letter deleted successfully." });
    } else {
      res.status(404).send({ message: "Resignation letter not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
