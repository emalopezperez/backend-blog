const { Router } = require('express');
const resource = require('../controllers/resources');
const { verifyToken, isAdmin } = require('../middlewares/authJwt')

const router = Router()

router.post('/create-resource', resource.createResource);
router.get('/get-resource', resource.getResource);


module.exports = router;