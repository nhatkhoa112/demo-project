const Category = require('../models/category.model');

const categoriesController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find({});
      res.json(categories);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(404).json({ msg: 'This category is existed ' });
      const newCategory = await new Category({ name });
      await newCategory.save();
      res.json({
        msg: 'Updated  category successfully',
        category: newCategory,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      );

      await category.save();
      res.json({ msg: 'Created category successfully', category });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndDelete({ _id: id });

      res.json({ msg: 'Delete category successfully', category });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = categoriesController;
