// userOfferLetter.routes.js
var express = require("express");
var router = express.Router();

const withAuth = require("../withAuth");
const offerLetterController = require("../controllers/userOfferLetter.controller.js");

// Create a new Offer Letter
router.post(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  offerLetterController.createOfferLetter
);

// Retrieve all Offer Letters
router.get(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  offerLetterController.findAll
);

// Retrieve a single Offer Letter by id
router.get(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdminOrManager,
  offerLetterController.findOne
);

// Update an Offer Letter by id
router.put(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  offerLetterController.update
);

// Delete an Offer Letter by id
router.delete(
  "/:id",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  offerLetterController.delete
);

module.exports = router;
