const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller.js");
const withAuth = require("../withAuth");

// Mark Attendance Clock In
router.post(
  "/clock-in",
  withAuth.verifyToken,
  attendanceController.markAttendanceClockIn
);

// Mark Attendance Clock Out
router.put(
  "/clock-out",
  withAuth.verifyToken,
  attendanceController.markAttendanceClockOut
);

// Create and Save a new Attendance record
router.post("/mark", withAuth.verifyToken, attendanceController.markAttendance);

// Retrieve attendance for today for all users
router.get(
  "/today",
  withAuth.verifyToken,
  attendanceController.getTodayAttendance
);

// Retrieve attendance for this month for all users
router.get(
  "/this-month",
  withAuth.verifyToken,
  attendanceController.getThisMonthAttendance
);

// Retrieve attendance for this year for all users
router.get(
  "/this-year",
  withAuth.verifyToken,
  attendanceController.getThisYearAttendance
);

// Retrieve all Attendance records or filter by date and/or userId
router.get("/", withAuth.verifyToken, attendanceController.findByDateAndUserId);

// Retrieve Attendance records for the last 14 days and the next 7 days
router.get("/recent", withAuth.verifyToken, attendanceController.findAllRecent);

// Retrieve Attendance records for a specific department within a date range
router.get(
  "/recent/department/:id",
  withAuth.verifyToken,
  attendanceController.findAllRecentAndDept
);

// Retrieve Attendance records for a specific user within a date range
router.get(
  "/recent/user/:id",
  withAuth.verifyToken,
  attendanceController.findAllRecentAndUser
);

// Retrieve Attendance records for today for a specific user
router.get(
  "/today/user/:id",
  withAuth.verifyToken,
  attendanceController.getTodayAttendanceByUser
);

// Retrieve Attendance records by Department Id
router.get(
  "/department/:id",
  withAuth.verifyToken,
  attendanceController.findAllByDeptId
);

// Retrieve Attendance records by User Id
router.get(
  "/user/:id",
  withAuth.verifyToken,
  attendanceController.getAttendanceByUser
);

// Find a single Attendance record by id
router.get("/:id", withAuth.verifyToken, attendanceController.findOne);

// Get worked hours by date for a user
router.get(
  "/worked-hours/user/:id/date/:date",
  withAuth.verifyToken,
  attendanceController.getWorkedHoursByDate
);

// Get worked hours for the last 7 days for a user
router.get(
  "/worked-hours/user/:id/last7days",
  withAuth.verifyToken,
  attendanceController.getWorkedHoursLast7Days
);

// Update an Attendance record by the id in the request
router.put("/:id", withAuth.verifyToken, attendanceController.update);

// Delete an Attendance record by the specified id in the request
router.delete("/:id", withAuth.verifyToken, attendanceController.delete);

// Delete all Attendance records
router.delete("/", withAuth.verifyToken, attendanceController.deleteAll);

// Delete all Attendance records by User Id
router.delete(
  "/user/:id",
  withAuth.verifyToken,
  attendanceController.deleteAllByUserId
);

module.exports = router;
