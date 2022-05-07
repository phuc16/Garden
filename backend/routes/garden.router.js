const express = require('express');
const router = express.Router();

const garden = require('../app/controllers/garden.controller');

router.get('/statistic', garden.getGardenStatistic)

router.get('/', garden.getAllGarden)

router.get('/:id', garden.getGardenById)

router.post('/', garden.insertGarden)

router.put('/:id', garden.updateGarden)

router.delete('/:id', garden.deleteGarden)



module.exports = router;