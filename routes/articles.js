const { Router } = require('express');
const articlesControllers = require('../controllers/articles');
const getItemsControllers = require('../controllers/articles')
const getItemControllers = require('../controllers/articles')

const router = Router()

router.post('/create', articlesControllers.create);
router.get('/articles/:home?', getItemsControllers.getItems)
router.get('/article/:id', getItemControllers.getItem)

module.exports = router;