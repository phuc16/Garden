const express = require('express');
const router = express.Router();

const schedule = require('../app/controllers/schedule.controller');

router.get('/device/:device_id', schedule.getScheduleByDeviceId) //with start and end dates

router.get('/', schedule.getAllSchedules) //with start and end dates

router.get('/:id', schedule.getScheduleById)

router.post('/', schedule.insertSchedule)

router.put('/:id', schedule.updateSchedule)

router.delete('/', schedule.deleteAll);

router.delete('/:id', schedule.deleteId);

module.exports = router;