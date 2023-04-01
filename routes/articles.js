const { Router } = require('express');
const articlesControllers = require('../controllers/articles');
const getItemsControllers = require('../controllers/articles')
const getItemControllers = require('../controllers/articles')
const deleteItemControllers = require('../controllers/articles')
const updateItemControllers = require('../controllers/articles')

const router = Router()

router.post('/create', articlesControllers.create);
router.get('/articles/:home?', getItemsControllers.getItems)
router.get('/article/:id', getItemControllers.getItem)
router.delete('/article/:id', deleteItemControllers.deleteItem)
router.put('/article/:id', updateItemControllers.updateItem)

module.exports = router;