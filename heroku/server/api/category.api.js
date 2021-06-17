const router = require('express').Router();
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.getAllCategories);

router.post('/', auth, authAdmin, categoryController.createCategory);

router.delete('/:id', auth, authAdmin, categoryController.deleteCategory);

router.patch('/:id', auth, authAdmin, categoryController.updateCategory);

module.exports = router;
