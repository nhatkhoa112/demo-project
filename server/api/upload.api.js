const router = require('express').Router();
const uploadImage = require('../middlewares/uploadImage');
const uploadController = require('../controllers/upload.controller');
const auth = require('../middlewares/auth');

router.post('/', uploadImage, auth, uploadController.upload);

router.delete('/', auth, uploadController.destroy);

module.exports = router;
