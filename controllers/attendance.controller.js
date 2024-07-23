const Attendance = require('../models/attendance.model');

exports.markAttendance = async (req, res) => {
  try {
    const { userId, date, status } = req.body;
    const attendance = await Attendance.create({ userId, date, status });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendanceByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const attendances = await Attendance.findAll({ where: { userId } });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
