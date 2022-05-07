const express = require('express');
const router = express.Router();

const schedule = require('../app/controllers/schedule.controller');

router.get('/:device_id', schedule.getSchedule)

module.exports = router;