const db = require("../models");
const Attendance = db.attendance;
const User = db.user;
const Op = db.Sequelize.Op;
const moment = require("moment");

// Create and Save a new Attendance record
exports.markAttendance = async (req, res) => {
  try {
    const {
      userId,
      date,
      status,
      clockinTime,
      latitudeClockin,
      longitudeClockin,
      clockoutTime,
      latitudeClockout,
      longitudeClockout,
    } = req.body;
    console.log(req.body,"hhhh")
    const attendance = await Attendance.create({
      userId,
      date,
      status,
      clockinTime,
      latitudeClockin,
      longitudeClockin,
      clockoutTime,
      latitudeClockout,
      longitudeClockout,
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
exports.markAttendanceClockIn = async (req, res) => {
  try {
    const {
      userId,
      date,
      clockinTime,
      latitudeClockin,
      longitudeClockin,
    } = req.body;

    console.log("Request body:", req.body); // Log the entire request body for debugging

    // Validate input data
    if (!userId) {
      throw new Error("User ID is required");
    }
    if (!date) {
      throw new Error("Date is required");
    }
    if (!clockinTime) {
      throw new Error("Clock-in time is required");
    }
    if (latitudeClockin === undefined || longitudeClockin === undefined) {
      throw new Error("Clock-in location (latitude and longitude) is required");
    }

    // Validate date format
    const parsedDate = Date.parse(date);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format");
    }

    // Validate clock-in time format (allowing both HH:MM:SS and ISO 8601)
    // const clockinTimeISORegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;
    // const clockinTimeHHMMSSRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    // if (!clockinTimeISORegex.test(clockinTime) && !clockinTimeHHMMSSRegex.test(clockinTime)) {
    //   throw new Error("Invalid clock-in time format");
    // }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User does not exist");
    }

    // Create the attendance record
    const attendance = await Attendance.create({
      userId,
      date,
      status: 'Present',
      clockinTime,
      latitudeClockin,
      longitudeClockin,
    });
    console.log(attendance, "atte");
    res.status(201).json(attendance);
  } catch (error) {
    console.error(error, "err");
    if (error.message.includes("required")) {
      res.status(400).json({ error: error.message });
    } else if (error.message.includes("format")) {
      res.status(422).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

exports.markAttendanceClockOut=async(req,res)=>{
  try {
    const {
      userId,
      date,
      clockoutTime,
      latitudeClockout,
      longitudeClockout,
    } = req.body;
    const attendance = await Attendance.update({
      userId,
      date,
      clockoutTime,
      latitudeClockout,
      longitudeClockout,
    },{
  where:{
    userId:userId,
    latitudeClockout:null,
  }
  });
  console.log(attendance,"uuuuu")
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.markAttendance = async (req, res) => {
  try {
    const {
      userId,
      date,
      status,
      clockinTime,
      latitudeClockin,
      longitudeClockin,
      clockoutTime,
      latitudeClockout,
      longitudeClockout,
    } = req.body;
    const attendance = await Attendance.create({
      userId,
      date,
      status,
      clockinTime,
      latitudeClockin,
      longitudeClockin,
      clockoutTime,
      latitudeClockout,
      longitudeClockout,
    });
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
      res.status(400).json({
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
      res.status(400).json({
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
