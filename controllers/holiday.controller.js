const db = require('../models');
const Holiday = db.holiday;

// Create a new holiday
exports.createHoliday = async (req, res) => {
  try {
    const { name, date, description, year } = req.body;
    const holiday = await Holiday.create({ name, date, description, year });
    res.status(201).json(holiday);
  } catch (error) {
    console.error("Error creating holiday: ", error);
    res.status(500).json({ message: "Error creating holiday" });
  }
};

// Get all holidays
exports.getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.findAll();
    res.status(200).json(holidays);
  } catch (error) {
    console.error("Error fetching holidays: ", error);
    res.status(500).json({ message: "Error fetching holidays" });
  }
};

// Get holiday by ID
exports.getHolidayById = async (req, res) => {
  const { id } = req.params;
  try {
    const holiday = await Holiday.findByPk(id);
    if (holiday) {
      res.status(200).json(holiday);
    } else {
      res.status(404).json({ message: "Holiday not found" });
    }
  } catch (error) {
    console.error("Error fetching holiday: ", error);
    res.status(500).json({ message: "Error fetching holiday" });
  }
};

// Update a holiday
exports.updateHoliday = async (req, res) => {
  const { id } = req.params;
  const { name, date, description, year } = req.body;
  try {
    const holiday = await Holiday.findByPk(id);
    if (holiday) {
      holiday.name = name || holiday.name;
      holiday.date = date || holiday.date;
      holiday.description = description || holiday.description;
      holiday.year = year || holiday.year;
      await holiday.save();
      res.status(200).json(holiday);
    } else {
      res.status(404).json({ message: "Holiday not found" });
    }
  } catch (error) {
    console.error("Error updating holiday: ", error);
    res.status(500).json({ message: "Error updating holiday" });
  }
};

// Delete a holiday
exports.deleteHoliday = async (req, res) => {
  const { id } = req.params;
  try {
    const holiday = await Holiday.findByPk(id);
    if (holiday) {
      await holiday.destroy();
      res.status(200).json({ message: "Holiday deleted successfully" });
    } else {
      res.status(404).json({ message: "Holiday not found" });
    }
  } catch (error) {
    console.error("Error deleting holiday: ", error);
    res.status(500).json({ message: "Error deleting holiday" });
  }
};
