const express = require('express');
const router = express.Router();

const device = require('../app/controllers/device.controller');

router.get('/', device.getAllDevices)

router.get('/:id', device.getDeviceById)

router.post('/', device.insertDevice)

router.put('/:id', device.updateDevice)

router.delete('/', device.deleteAll);

router.delete('/:id', device.deleteId);



module.exports = router;