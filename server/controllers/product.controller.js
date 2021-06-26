const Product = require('../models/product.model');

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => '$' + match
    );
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 12;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productController = {
  create: async (req, res) => {
    try {
      const product_id = Date.now();
      const {
        title,
        price,
        description,
        images,
        sale,
        categories,
        reviews,
        sold,
      } = req.body;
      if (!images) return res.status(400).json({ msg: 'No image upload' });
      const product = await Product.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: 'This product is already exists.' });
      const newProduct = await new Product({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        images,
        sale,
        categories,
        reviews,
        sold,
      });
      await newProduct.save();
      res.json({ msg: 'Created a product', data: { product: newProduct } });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  get: async (req, res) => {
    try {
      const features1 = new APIfeatures(
        Product.find().populate({ path: 'categories', model: 'Category' }),
        req.query
      )
        .filtering()
        .sorting();
      // .paginating();

      const products1 = await features1.query;

      let total = products1.length;
      const features = new APIfeatures(
        Product.find().populate({ path: 'categories', model: 'Category' }),
        req.query
      )
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;

      res.json({
        status: 'success',
        result: products.length,
        products: products,
        total: total,
        isPagination: true,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getProductById: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findOne({ _id: id })
        .populate('categories')
        .populate({
          path: 'reviews',
          model: 'Review',
          populate: {
            path: 'owner',
            model: 'User',
          },
        });
      if (!product)
        return res.status(400).json({ msg: 'Product is not existed' });

      res.json({ msg: 'Here is your product:', product });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Deleted a Product', data: { product } });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );

      await product.save();
      res.json({ msg: 'Updated a Product', data: { product } });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  search: async (req, res) => {
    try {
      const total = await Product.find().countDocuments();

      const features = new APIfeatures(
        Product.find().populate({ path: 'categories', model: 'Category' }),
        req.query
      )
        .filtering()
        .sorting();
      // .paginating();

      const products = await features.query;

      const feature1 = new APIfeatures(
        Product.find().populate({ path: 'categories', model: 'Category' }),
        req.query
      )
        .filtering()
        .sorting()
        .paginating();
      const products12 = await feature1.query;
      let newProducts = [];
      let isPag = true;
      if (req.query.price && req.query.price.gte) {
        isPag = false;
      }

      if (req.body.categories && req.body.categories.length > 0) {
        isPag = false;
        products.map((p) => {
          if (
            req.body.categories.some((cate) => {
              let pc = p.categories.map((pc) => pc._id);
              return pc.includes(cate);
            })
          ) {
            newProducts.push(p);
          }
        });
      } else {
        newProducts = products12;
      }

      res.json({
        status: 'success',
        result: newProducts.length,
        products: newProducts,
        total: total,
        isPagination: isPag,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productController;
