var express = require("express");
var router = express.Router();

const withAuth = require("../withAuth");
const userSalarySlip = require("../controllers/userSalarySlip.controller.js");

// Create a new User Salary Slip
router.post(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  userSalarySlip.createSalarySlip
);

// Retrieve all User Salary Slips
router.get(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  userSalarySlip.findAll
);

// Retrieve a User Salary Slip by User Id
router.get(
  "/user/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  userSalarySlip.findByUserId
);

// Retrieve a single User Salary Slip with an id
router.get(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  userSalarySlip.findOne
);

// Update a User Salary Slip with id
router.put(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  userSalarySlip.update
);

// Delete a User Salary Slip with id
router.delete(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  userSalarySlip.delete
);

module.exports = router;
