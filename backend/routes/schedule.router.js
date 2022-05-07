const express = require('express');
const router = express.Router();

const schedule = require('../app/controllers/schedule.controller');

router.get('/device/:device_id', schedule.getScheduleByDeviceId)

router.get('/', schedule.getAllSchedules)

router.get('/:id', schedule.getScheduleById)

router.post('/', schedule.insertSchedule)

router.put('/:id', schedule.updateSchedule)

router.delete('/', schedule.deleteAll);

router.delete('/:id', schedule.deleteId);

module.exports = router;