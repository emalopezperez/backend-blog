const { Router } = require('express');
const multipart = require('connect-multiparty');
const articlesControllers = require('../controllers/articles');
const getItemsControllers = require('../controllers/articles')
const getItemControllers = require('../controllers/articles')
const deleteItemControllers = require('../controllers/articles')
const updateItemControllers = require('../controllers/articles')
const imagesControllers = require('../controllers/articles')
const buscarControllers = require('../controllers/articles')
const { verifyToken, isAdmin } = require('../middlewares/authJwt')

const router = Router()

const path = multipart({ uploadDir: './imagenes/articulos' });

router.post('/create', [verifyToken, path], articlesControllers.create);
router.get('/imagen/:fichero', imagesControllers.image);
router.get('/articles/:home?', getItemsControllers.getItems)
router.get('/article/:id', getItemControllers.getItem)
router.delete('/article/:id', [verifyToken, isAdmin], deleteItemControllers.deleteItem)

router.get('/buscar/:busqueda', buscarControllers.search)

module.exports = router;