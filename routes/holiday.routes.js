const express = require('express');
const router = express.Router();
const holidayController = require('../controllers/holiday.controller');
const withAuth = require('../withAuth')

router.post('/',  withAuth.verifyToken,holidayController.createHoliday);
router.get('/',  withAuth.verifyToken,holidayController.getAllHolidays);
router.get('/:id', withAuth.verifyToken, holidayController.getHolidayById);
router.put('/:id', withAuth.verifyToken, holidayController.updateHoliday);
router.delete('/:id',  withAuth.verifyToken,holidayController.deleteHoliday);

module.exports = router;
