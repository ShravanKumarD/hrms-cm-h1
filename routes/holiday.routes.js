const express = require('express');
const router = express.Router();
const holidayController = require('../controllers/holiday.controller');
const withAuth = require('../withAuth')

router.post('/',  withAuth.verifyToken,withAuth.withAnyRole,holidayController.createHoliday);
router.get('/',  withAuth.verifyToken,withAuth.withAnyRole,holidayController.getAllHolidays);
router.get('/:id', withAuth.verifyToken, withAuth.withAnyRole,holidayController.getHolidayById);
router.put('/:id', withAuth.verifyToken, withAuth.withAnyRole,holidayController.updateHoliday);
router.delete('/:id',  withAuth.verifyToken,withAuth.withAnyRole,holidayController.deleteHoliday);

module.exports = router;
