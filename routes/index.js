const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController')

//-------------------------------
router.get('/', controller.index)
router.get('/search', controller.search)
router.get('/categories/:id', controller.categories)
router.get('/chat', controller.chat)


module.exports = router;