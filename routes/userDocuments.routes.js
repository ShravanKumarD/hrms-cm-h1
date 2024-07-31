const express = require("express");
const router = express.Router();

const withAuth = require("../withAuth");
const userDocuments = require("../controllers/userDocuments.controller");

// Upload and create User Documents
router.post(
  "/",
  withAuth.verifyToken,
  withAuth.withRoleAdmin,
  userDocuments.uploadDocument,
  userDocuments.create
);

// Retrieve User Documents by User Id
router.get("/user/:id", withAuth.verifyToken, userDocuments.findByUserId);

module.exports = router;
