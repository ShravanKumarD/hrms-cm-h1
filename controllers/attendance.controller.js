const db = require("../models");
const Attendance = db.attendance;
const User = db.user;
const Op = db.Sequelize.Op;
const moment = require("moment");

// Create and Save a new Attendance record
exports.markAttendance = async (req, res) => {
  try {
    const { userId, date, status } = req.body;
    const attendance = await Attendance.create({ userId, date, status });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all Attendance records
exports.findAll = async (req, res) => {
  try {
    const attendances = await Attendance.findAll({ include: User });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve Attendance records for the last 14 days and the next 7 days
exports.findAllRecent = async (req, res) => {
  try {
    const attendances = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [
            moment().subtract(14, "days").toDate(),
            moment().add(7, "days").toDate(),
          ],
        },
      },
      include: [User],
    });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve Attendance records for a specific department within a date range
exports.findAllRecentAndDept = async (req, res) => {
  const deptId = req.params.id;
  try {
    const attendances = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [
            moment().subtract(14, "days").toDate(),
            moment().add(7, "days").toDate(),
          ],
        },
      },
      include: [
        {
          model: User,
          where: { departmentId: deptId },
        },
      ],
    });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve Attendance records for a specific user within a date range
exports.findAllRecentAndUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const attendances = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [
            moment().subtract(14, "days").toDate(),
            moment().add(7, "days").toDate(),
          ],
        },
        userId: userId,
      },
      include: [User],
    });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve Attendance records by Department Id
exports.findAllByDeptId = async (req, res) => {
  const deptId = req.params.id;
  try {
    const attendances = await Attendance.findAll({
      include: [
        {
          model: User,
          where: { departmentId: deptId },
        },
      ],
    });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve Attendance records by User Id
exports.getAttendanceByUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const attendances = await Attendance.findAll({
      where: { userId },
      include: [User],
    });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find a single Attendance record by id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const attendance = await Attendance.findByPk(id);
    res.status(200).json(attendance);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error retrieving Attendance with id=${id}` });
  }
};

// Update an Attendance record by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Attendance.update(req.body, { where: { id } });
    if (num == 1) {
      res.status(200).json({ message: "Attendance was updated successfully." });
    } else {
      res
        .status(400)
        .json({
          message: `Cannot update Attendance with id=${id}. Maybe Attendance was not found or req.body is empty!`,
        });
    }
  } catch (error) {
    res.status(500).json({ error: `Error updating Attendance with id=${id}` });
  }
};

// Delete an Attendance record by the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Attendance.destroy({ where: { id } });
    if (num == 1) {
      res.status(200).json({ message: "Attendance was deleted successfully!" });
    } else {
      res
        .status(400)
        .json({
          message: `Cannot delete Attendance with id=${id}. Maybe Attendance was not found!`,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Could not delete Attendance with id=${id}` });
  }
};

// Delete all Attendance records
exports.deleteAll = async (req, res) => {
  try {
    const nums = await Attendance.destroy({ where: {}, truncate: false });
    res
      .status(200)
      .json({ message: `${nums} Attendances were deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all Attendance records by User Id
exports.deleteAllByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const nums = await Attendance.destroy({
      where: { userId },
      truncate: false,
    });
    res
      .status(200)
      .json({ message: `${nums} Attendances were deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
