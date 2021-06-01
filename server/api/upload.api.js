const router = require('express').Router();
const uploadImage = require('../middlewares/uploadImage');
const uploadController = require('../controllers/upload.controller');
const auth = require('../middlewares/auth');

router.post('/upload', uploadImage, auth, uploadController.upload);

router.post('/destroy', auth, uploadController.destroy);

module.exports = router;
