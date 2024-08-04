var express = require("express");
var router = express.Router();

const withAuth = require("../withAuth");
const relievingLetterController = require("../controllers/userRelievingLetter.controller.js");

// Create a new Relieving Letter
router.post(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  relievingLetterController.createRelievingLetter
);

// Retrieve all Relieving Letters
router.get(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  relievingLetterController.findAll
);

// Retrieve a single Relieving Letter by id
router.get(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  relievingLetterController.findOne
);

// Update a Relieving Letter by id
router.put(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  relievingLetterController.update
);

// Delete a Relieving Letter by id
router.delete(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  relievingLetterController.delete
);

module.exports = router;
