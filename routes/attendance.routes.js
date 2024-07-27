const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller.js");
const withAuth = require("../withAuth");


router.put('/clock-out',withAuth.verifyToken,attendanceController.markAttendanceClockOut);

// Create and Save a new Attendance record
router.post("/mark", withAuth.verifyToken, attendanceController.markAttendance);

// Retrieve all Attendance records
router.get("/", withAuth.verifyToken, attendanceController.findAll);

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

router.post('/clock-in',  withAuth.verifyToken,attendanceController.markAttendanceClockIn);

module.exports = router;
