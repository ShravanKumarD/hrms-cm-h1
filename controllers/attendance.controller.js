const db = require("../models");
const Attendance = db.attendance;
const User = db.user;
const Op = db.Sequelize.Op;
const moment = require("moment");

// Helper function to exclude sensitive fields from User data
const excludeSensitiveUserFields = (user) => {
  if (!user) return null;
  const { password, role, ...safeUserData } = user;
  return safeUserData;
};

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

    // Check if attendance already exists for the given user and date
    const existingAttendance = await Attendance.findOne({
      where: { userId, date },
    });

    if (existingAttendance) {
      return res.status(400).json({
        error: "Attendance record already exists for this date and user.",
      });
    }

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
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        error: "Attendance record already exists for this date and user.",
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Mark Attendance Clock In
exports.markAttendanceClockIn = async (req, res) => {
  try {
    const { userId, date, clockinTime, latitudeClockin, longitudeClockin } =
      req.body;

    console.log("Clock In Request Body:", req.body);

    const parsedDate = Date.parse(date);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User does not exist");
    }

    // Check if attendance already exists for the given user and date
    const existingAttendance = await Attendance.findOne({
      where: { userId, date },
    });

    if (existingAttendance) {
      return res.status(400).json({
        error: "Attendance record already exists for this date and user.",
      });
    }

    const attendance = await Attendance.create({
      userId,
      date,
      status: "Present",
      clockinTime,
      latitudeClockin: latitudeClockin || null,
      longitudeClockin: longitudeClockin || null,
    });

    res.status(201).json(attendance);
  } catch (error) {
    console.error("Clock In Error:", error);
    if (error.message.includes("required")) {
      res.status(400).json({ error: error.message });
    } else if (error.message.includes("format")) {
      res.status(422).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Mark Attendance Clock Out
exports.markAttendanceClockOut = async (req, res) => {
  try {
    const { userId, date, clockoutTime, latitudeClockout, longitudeClockout } =
      req.body;

    console.log("Clock Out Request Body:", req.body);

    const [num] = await Attendance.update(
      {
        clockoutTime,
        latitudeClockout: latitudeClockout || null,
        longitudeClockout: longitudeClockout || null,
      },
      {
        where: {
          userId,
          date,
          clockoutTime: null,
        },
      }
    );

    if (num === 1) {
      res.status(200).json({ message: "Attendance clocked out successfully" });
    } else {
      res.status(404).json({
        message: "Attendance record not found or already clocked out",
      });
    }
  } catch (error) {
    console.error("Clock Out Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all Attendance records
// exports.findAll = async (req, res) => {
//   try {
//     const attendances = await Attendance.findAll({
//       include: {
//         model: User,
//         attributes: { exclude: ["password", "role"] },
//       },
//     });
//     res.status(200).json(
//       attendances.map((attendance) => ({
//         ...attendance.toJSON(),
//         User: excludeSensitiveUserFields(attendance.User),
//       }))
//     );
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Retrieve Attendance records by date and/or userId or none (it replaced the findAll function)
exports.findByDateAndUserId = async (req, res) => {
  try {
    const { userId, date } = req.query;
    const whereConditions = {};

    if (userId) {
      whereConditions.userId = userId;
    }

    if (date) {
      const parsedDate = moment(date, "YYYY-MM-DD", true);
      if (!parsedDate.isValid()) {
        return res
          .status(422)
          .json({ error: "Invalid date format, use YYYY-MM-DD" });
      }
      whereConditions.date = parsedDate.format("YYYY-MM-DD");
    }

    const attendances = await Attendance.findAll({
      where: whereConditions,
      include: {
        model: User,
        attributes: { exclude: ["password", "role"] },
      },
    });

    res.status(200).json(
      attendances.map((attendance) => ({
        ...attendance.toJSON(),
        User: excludeSensitiveUserFields(attendance.User),
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve attendance for today for a specific user
exports.getTodayAttendanceByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const today = moment().startOf("day").format("YYYY-MM-DD");

    const attendance = await Attendance.findOne({
      where: {
        userId: userId,
        date: today,
      },
      include: {
        model: User,
        attributes: { exclude: ["password", "role"] },
      },
    });

    if (!attendance) {
      return res.status(404).json({ message: "No attendance record found for today." });
    }

    res.status(200).json({
      ...attendance.toJSON(),
      User: excludeSensitiveUserFields(attendance.User),
    });
  } catch (error) {
    console.error("Error fetching today's attendance:", error);
    res.status(500).json({ error: "Internal server error" });
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
      include: {
        model: User,
        attributes: { exclude: ["password", "role"] },
      },
    });
    res.status(200).json(
      attendances.map((attendance) => ({
        ...attendance.toJSON(),
        User: excludeSensitiveUserFields(attendance.User),
      }))
    );
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
          attributes: { exclude: ["password", "role"] },
        },
      ],
    });
    res.status(200).json(
      attendances.map((attendance) => ({
        ...attendance.toJSON(),
        User: excludeSensitiveUserFields(attendance.User),
      }))
    );
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
      include: {
        model: User,
        attributes: { exclude: ["password", "role"] },
      },
    });
    res.status(200).json(
      attendances.map((attendance) => ({
        ...attendance.toJSON(),
        User: excludeSensitiveUserFields(attendance.User),
      }))
    );
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
          attributes: { exclude: ["password", "role"] },
        },
      ],
    });
    res.status(200).json(
      attendances.map((attendance) => ({
        ...attendance.toJSON(),
        User: excludeSensitiveUserFields(attendance.User),
      }))
    );
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
      include: {
        model: User,
        attributes: { exclude: ["password", "role"] },
      },
    });
    res.status(200).json(
      attendances.map((attendance) => ({
        ...attendance.toJSON(),
        User: excludeSensitiveUserFields(attendance.User),
        totalHours: attendance.totalHours, // This line is optional, the virtual field is already included in attendance.toJSON()
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find a single Attendance record by id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const attendance = await Attendance.findByPk(id, {
      include: {
        model: User,
        attributes: { exclude: ["password", "role"] },
      },
    });
    res.status(200).json({
      ...attendance.toJSON(),
      User: excludeSensitiveUserFields(attendance.User),
    });
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
    const [num] = await Attendance.update(req.body, { where: { id } });
    if (num === 1) {
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
    if (num === 1) {
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

// Fetch worked hours by date for a specific user
exports.getWorkedHoursByDate = async (req, res) => {
  try {
    const userId = req.params.id;
    const date = moment(req.params.date, "YYYY-MM-DD").startOf("day").toDate();

    const attendanceRecord = await Attendance.findOne({
      where: {
        userId: userId,
        date: date,
      },
    });

    if (!attendanceRecord) {
      return res
        .status(404)
        .json({ message: "Attendance record not found for the given date" });
    }

    const clockinTime = moment(attendanceRecord.clockinTime, "HH:mm:ss");
    const clockoutTime = moment(attendanceRecord.clockoutTime, "HH:mm:ss");
    const workedHours = clockoutTime.diff(clockinTime, "hours", true); // Calculate worked hours

    res.status(200).json({ date: req.params.date, workedHours });
  } catch (error) {
    console.error("Error fetching worked hours:", error);
    res.status(500).send("Server error");
  }
};

// Fetch worked hours for the last 7 days for a specific user
exports.getWorkedHoursLast7Days = async (req, res) => {
  try {
    const userId = req.params.id;
    const today = moment().startOf("day").toDate();
    const startDate = moment().subtract(7, "days").startOf("day").toDate();

    const attendanceRecords = await Attendance.findAll({
      where: {
        userId: userId,
        date: {
          [Op.between]: [startDate, today],
        },
      },
    });

    const workedHoursLast7Days = attendanceRecords.map((record) => {
      const clockinTime = moment(record.clockinTime, "HH:mm:ss");
      const clockoutTime = moment(record.clockoutTime, "HH:mm:ss");
      const workedHours = clockoutTime.diff(clockinTime, "hours", true);
      return { date: moment(record.date).format("YYYY-MM-DD"), workedHours };
    });

    res.status(200).json(workedHoursLast7Days);
  } catch (error) {
    console.error("Error fetching worked hours for last 7 days:", error);
    res.status(500).send("Server error");
  }
};

// Retrieve attendance for today for all users
exports.getTodayAttendance = async (req, res) => {
  try {
    const today = moment().startOf("day");
    const attendances = await Attendance.findAll({
      where: {
        date: today.format("YYYY-MM-DD"),
      },
      include: {
        model: User,
        attributes: { exclude: ["password", "role"] },
      },
    });

    res.status(200).json(
      attendances.map((attendance) => ({
        ...attendance.toJSON(),
        User: excludeSensitiveUserFields(attendance.User),
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve attendance for this month for all users
exports.getThisMonthAttendance = async (req, res) => {
  try {
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    const attendances = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [
            startOfMonth.format("YYYY-MM-DD"),
            endOfMonth.format("YYYY-MM-DD"),
          ],
        },
      },
      include: {
        model: User,
        attributes: { exclude: ["password", "role"] },
      },
    });

    res.status(200).json(
      attendances.map((attendance) => ({
        ...attendance.toJSON(),
        User: excludeSensitiveUserFields(attendance.User),
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve attendance for this year for all users
exports.getThisYearAttendance = async (req, res) => {
  try {
    const startOfYear = moment().startOf("year");
    const endOfYear = moment().endOf("year");

    const attendances = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [
            startOfYear.format("YYYY-MM-DD"),
            endOfYear.format("YYYY-MM-DD"),
          ],
        },
      },
      include: {
        model: User,
        attributes: { exclude: ["password", "role"] },
      },
    });

    res.status(200).json(
      attendances.map((attendance) => ({
        ...attendance.toJSON(),
        User: excludeSensitiveUserFields(attendance.User),
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
