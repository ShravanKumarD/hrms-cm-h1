const express = require('express');
const router = express.Router();
const holidayController = require('../controllers/holiday.controller');
const withAuth = require('../withAuth')

router.post('/',  withAuth.verifyToken,withAnyRole,holidayController.createHoliday);
router.get('/',  withAuth.verifyToken,withAnyRole,holidayController.getAllHolidays);
router.get('/:id', withAuth.verifyToken, withAnyRole,holidayController.getHolidayById);
router.put('/:id', withAuth.verifyToken, withAnyRole,holidayController.updateHoliday);
router.delete('/:id',  withAuth.verifyToken,withAnyRole,holidayController.deleteHoliday);

module.exports = router;
