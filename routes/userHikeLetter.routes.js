var express = require("express");
var router = express.Router();

const withAuth = require("../withAuth");
const hikeLetterController = require("../controllers/userHikeLetter.controller.js");

// Create a new Hike Letter
router.post(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  hikeLetterController.createHikeLetter
);

// Retrieve all Hike Letters
router.get(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  hikeLetterController.findAll
);

// Retrieve a single Hike Letter by id
router.get(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  hikeLetterController.findOne
);

// Update a Hike Letter by id
router.put(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  hikeLetterController.update
);

// Delete a Hike Letter by id
router.delete(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  hikeLetterController.delete
);

module.exports = router;
