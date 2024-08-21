var express = require('express')
var router = express.Router()

const withAuth = require('../withAuth')
const application = require('../controllers/application.controller.js')

// Retrieve all applications
router.get('/', withAuth.verifyToken, withAuth.withRoleAdminOrManager, application.findAll)

// Create a new Application
router.post('/', withAuth.verifyToken, application.create)

// Retrieve all Applications by User Id
router.get('/user/:id', withAuth.verifyToken, application.findAllByUserId)

// Retrieve all Applications by Department Id
router.get('/department/:id', withAuth.verifyToken, withAuth.withRoleManager, application.findAllByDeptId)

// Retrieve Recent Applications (2 weeks old)
router.get('/recent', withAuth.verifyToken, application.findAllRecent)

// Retrieve Recent Applications (2 weeks old) and Department
router.get('/recent/department/:id', withAuth.verifyToken, withAuth.withRoleManager, application.findAllRecentAndDept)

// Retrieve Recent Applications (2 weeks old) and User
router.get('/recent/user/:id', withAuth.verifyToken, application.findAllRecentAndUser)

// Retrieve a single Application by Id
router.get('/:id', withAuth.verifyToken, application.findOne)

// Update an Application by Id
router.put('/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, application.update)

// Delete all Applications
router.delete('/', withAuth.verifyToken, withAuth.withRoleAdmin, application.deleteAll)

// Delete a single Application by Id
router.delete('/:id', withAuth.verifyToken, withAuth.withRoleAdminOrManager, application.delete)

// Delete all Applications by User Id
router.delete('/user/:id', withAuth.verifyToken, withAuth.withRoleAdmin, application.deleteAllByUserId);

module.exports = router;
