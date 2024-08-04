var express = require("express");
var router = express.Router();

const withAuth = require("../withAuth");
const resignationLetterController = require("../controllers/userResignationLetter.controller.js");

// Create a new Resignation Letter
router.post(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  resignationLetterController.createResignationLetter
);

// Retrieve all Resignation Letters
router.get(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  resignationLetterController.findAll
);

// Retrieve a single Resignation Letter by id
router.get(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  resignationLetterController.findOne
);

// Update a Resignation Letter by id
router.put(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  resignationLetterController.update
);

// Delete a Resignation Letter by id
router.delete(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  resignationLetterController.delete
);

module.exports = router;
