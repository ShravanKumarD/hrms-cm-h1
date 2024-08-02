// offerLetter.controller.js
const db = require("../models");
const UserOfferLetter = db.userOfferLetter;
const User = db.user;

// Create a new Offer Letter
exports.createOfferLetter = async (req, res) => {
  try {
    const {
      userId,
      full_name,
      recipient_place,
      role,
      department,
      salary,
      start_date,
      end_date,
      location,
      work_schedule,
      company_name,
      sender_name,
      sender_title,
    } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required." });
    }

    const offerLetter = await UserOfferLetter.create({
      user_id: userId,
      full_name,
      recipient_place,
      role,
      department,
      salary,
      start_date,
      end_date,
      location,
      work_schedule,
      company_name,
      sender_name,
      sender_title,
    });

    res.status(201).send(offerLetter);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve all Offer Letters
exports.findAll = async (req, res) => {
  try {
    const offerLetters = await UserOfferLetter.findAll();
    res.status(200).send(offerLetters);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve a single Offer Letter by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const offerLetter = await UserOfferLetter.findByPk(id);
    if (!offerLetter) {
      return res.status(404).send({ message: "Offer letter not found." });
    }
    res.status(200).send(offerLetter);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update an Offer Letter by id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await UserOfferLetter.update(req.body, { where: { id } });

    if (updated) {
      const updatedOfferLetter = await UserOfferLetter.findByPk(id);
      res.status(200).send(updatedOfferLetter);
    } else {
      res.status(404).send({ message: "Offer letter not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete an Offer Letter by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await UserOfferLetter.destroy({ where: { id } });

    if (deleted) {
      res.status(200).send({ message: "Offer letter deleted successfully." });
    } else {
      res.status(404).send({ message: "Offer letter not found." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
