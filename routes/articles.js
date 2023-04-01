const { Router } = require('express');
const articlesControllers = require('../controllers/articles');
const getItemsController = require('../controllers/articles')

const router = Router()

router.post('/create', articlesControllers.create);

router.get('/articles/:home?', getItemsController.getItems)

module.exports = router;