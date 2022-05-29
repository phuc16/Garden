const express = require('express');
const router = express.Router();

const data = require('../app/controllers/dataController');

router.get('/search', data.getDataInfo)

router.get('/last', data.getAllLastData)

router.get('/:id', data.getDatabyGarden)

router.get('/', data.getAlldata)

router.post('', data.insertData)


module.exports = router;