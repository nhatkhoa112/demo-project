const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const auth = require('../middlewares/auth');
const fs = require('fs');
const uploadController = require('../controllers/upload.controller');
const upload = require('../middlewares/multer');
const multer = require('multer');
const uploadImage = require('../middlewares/uploadImage');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/* GET users listing. */
router.post('/avatar', uploadImage, auth, (req, res) => {
  try {
    const file = req.files.file;

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: 'final-project' },
      async (err, result) => {
        if (err) throw err;

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.post('/multi', upload.array('file', 10), uploadController.uploadMulti);

router.delete('/', auth, uploadController.destroy);

module.exports = router;
