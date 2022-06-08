const express = require('express');
const router = express.Router();

const data = require('../app/controllers/dataController');

router.get('/search', data.getDataInfo)

router.get('/last', data.getAllLastData)

router.get('/before-last', data.getBeforeLastData)

router.get('/:id', data.getDatabyGarden)

router.post('/full-type', data.insertDataFullType)

router.post('/', data.insertData)

router.get('/', data.getAlldata)



module.exports = router;