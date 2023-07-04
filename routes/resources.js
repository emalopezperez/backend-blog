const { Router } = require('express');
const resource = require('../controllers/resources');

const router = Router()

router.post('/create-resource', resource.createResource);
router.get('/get-resource', resource.getResource);


module.exports = router;