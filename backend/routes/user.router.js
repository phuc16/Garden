const express = require('express');
const router = express.Router();

const user = require('../app/controllers/user.controller');




router.get('/search-by-garden/:id', user.getUserByGarden)

router.get('/:id', user.getUserById)

router.get('/garden', user.getGardenByUser)

router.post('/', user.insertUser)

router.put('/:id', user.updateUserInfo)

router.delete('/:id', user.deleteUser)

router.get('/', user.getAllUser)

module.exports = router;