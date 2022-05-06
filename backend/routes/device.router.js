const express = require('express');
const router = express.Router();

const device = require('../app/controllers/device.controller');

router.get('/:id', device.getSchedule)

module.exports = router;