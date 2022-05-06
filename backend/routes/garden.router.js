const express = require('express');
const router = express.Router();

const garden = require('../app/controllers/garden.controller');

router.get('/', garden.getGardenStatistic)

module.exports = router;