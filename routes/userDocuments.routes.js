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
// lock this behind admin later if role != ADMIN, add multer file filters
// Retrieve User Documents by User Id
router.get("/user/:id", withAuth.verifyToken, userDocuments.findByUserId);

// Download User Document
router.post("/download", withAuth.verifyToken, userDocuments.downloadFile);

module.exports = router;
