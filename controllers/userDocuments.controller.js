const db = require("../models");
const UserDocuments = db.userDocuments;
const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Setup multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath;
        switch (file.fieldname) {
            case 'offerLetter':
                uploadPath = 'uploads/offerletters/';
                break;
            case 'salarySlips':
                uploadPath = 'uploads/salaryslips/';
                break;
            case 'hikeLetter':
                uploadPath = 'uploads/hikeletters/';
                break;
            case 'relievingLetter':
                uploadPath = 'uploads/relievingletters/';
                break;
            case 'resignationLetter':
                uploadPath = 'uploads/relievingletters/';
                break;
            default:
                uploadPath = 'uploads/';
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload User Document
exports.uploadDocument = upload.fields([
    { name: 'offerLetter', maxCount: 1 },
    { name: 'salarySlips', maxCount: 1 },
    { name: 'hikeLetter', maxCount: 1 },
    { name: 'relievingLetter', maxCount: 1 },
    { name: 'resignationLetter', maxCount: 1 }
]);

// Create and Save a new User Document
exports.create = (req, res) => {
    console.log("brrrrr");
    const userDocuments = {
        offerLetter: req.files.offerLetter ? req.files.offerLetter[0].path : null,
        salarySlips: req.files.salarySlips ? req.files.salarySlips[0].path : null,
        hikeLetter: req.files.hikeLetter ? req.files.hikeLetter[0].path : null,
        relievingLetter: req.files.relievingLetter ? req.files.relievingLetter[0].path : null,
        resignationLetter: req.files.resignationLetter ? req.files.resignationLetter[0].path : null,
        userId: req.body.userId
    };

    UserDocuments.create(userDocuments)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the UserDocuments."
            });
        });
};

// Retrieve User Document by User ID
exports.findByUserId = (req, res) => {
    const userId = req.params.id;

    UserDocuments.findOne({ where: { userId: userId } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving UserDocuments with userId=" + userId
            });
        });
};

// Controller method to download a file
exports.downloadFile = (req, res) => {
    const { filePath } = req.body;

    // Validate filePath
    if (!filePath || typeof filePath !== 'string') {
        return res.status(400).send({
            message: "Invalid file path."
        });
    }

    // Resolve the absolute path to prevent directory traversal attacks
    const absolutePath = path.resolve(filePath);

    if (fs.existsSync(absolutePath)) {
        res.download(absolutePath, (err) => {
            if (err) {
                console.error("Error downloading the file:", err);
                res.status(500).send({
                    message: "Error downloading the file."
                });
            }
        });
    } else {
        res.status(404).send({
            message: "File not found."
        });
    }
};