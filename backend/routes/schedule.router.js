const express = require('express');
const router = express.Router();

const schedule = require('../app/controllers/schedule.controller');

router.get('/:id', schedule.getSchedule)

module.exports = router;