const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller.js");

const withAuth = require("../withAuth");

router.post("/mark", withAuth.verifyToken, attendanceController.markAttendance);
router.get(
  "/:userId",
  withAuth.verifyToken,
  attendanceController.getAttendanceByUser
);

module.exports = router;
