const express = require('express');
const router = express.Router();

const data = require('../app/controllers/predictTemp.controller.js');

// startTime, endTime
router.get('/', data.predictTemperature)


module.exports = router;