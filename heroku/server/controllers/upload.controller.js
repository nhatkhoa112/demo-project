const fs = require('fs');
const cloudinary = require('../middlewares/cloudinary');

const uploadController = {
  uploadMulti: async (req, res) => {
    try {
      const uploader = async (path) => await cloudinary.uploads(path, 'Images');
      const urls = [];
      const files = req.files;
      for (const file of files) {
        if (file.size > 1024 * 1024 * 2) {
          return res.status(400).json({ msg: 'Size too large, maximum 2Mb' });
        }

        if (
          file.mimetype !== 'image/jpeg' &&
          file.mimetype !== 'image/png' &&
          file.mimetype !== 'image/jpg'
        ) {
          return res.status(400).json({ msg: 'File format is incorrect.' });
        }

        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      res.status(200).json({ msg: 'Uploaded image success!!', data: urls });
    } catch (error) {
      res.status(500).json({ msg: 'Uploaded image failure!!' });
    }
  },

  destroy: async (req, res) => {
    try {
      const { public_id } = req.body;
      if (!public_id)
        return res.status(400).json({ msg: 'No images Selected' });

      cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;

        res.json({ msg: 'Deleted Image' });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = uploadController;
