const express = require('express');
const router = express.Router();

const data = require('../app/controllers/dataController');

router.get('/search', data.getDataInfo)

router.post('', data.insertData)


module.exports = router;