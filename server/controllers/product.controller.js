const Product = require('../models/product.model');

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };

    //queryString = req.query

    const excludedFields = ['page', 'sort', 'limit'];

    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => '$' + match
    );
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
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
      const { product_id, title, price, description, content, images, sale } =
        req.body;
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
      });
      await newProduct.save();
      res.json({ msg: 'Created a product', data: { product: newProduct } });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const features = new APIfeatures(Product.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const products = await features.query;

      res.json({
        status: 'success',
        result: products.length,
        products: products,
      });
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
      const {} = req.body;
      if (!images) return res.status(400).json({ msg: 'No image upload' });
      const product = await Product.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });
      await product.save();
      res.json({ msg: 'Updated a Product', data: { product } });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productController;
