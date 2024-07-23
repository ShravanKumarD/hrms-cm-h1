const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");

router.post("/mark", attendanceController.markAttendance);
router.get("/:userId", attendanceController.getAttendanceByUser);

module.exports = router;
