const OrderItem = require('../models/orderItem.model.js');

const orderItemsController = {
  getOrderItemsById: async (req, res) => {
    try {
      let { status } = req.query;
      let orderItems;
      status = status === 'true' ? true : false;

      if (status) {
        orderItems = await OrderItem.find({
          owner: req.user.id,
          status,
        }).populate({
          path: 'product',
          populate: {
            path: 'categories',
          },
        });
      } else {
        orderItems = await OrderItem.find({
          owner: req.user.id,
        }).populate({
          path: 'product',
          populate: {
            path: 'categories',
          },
        });
      }

      // .populate('owner');
      res.json({ msg: 'All orderItems of user are here:', orderItems });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getOrderItemsByProductId: async (req, res) => {
    try {
      let { status, product } = req.query;
      let orderItems;
      status = status === 'true' ? true : false;

      if (status) {
        orderItems = await OrderItem.find({
          owner: req.user.id,
          product,
          status,
        }).populate({
          path: 'product',
          populate: {
            path: 'categories',
          },
        });
      } else {
        orderItems = await OrderItem.find({
          owner: req.user.id,
        }).populate({
          path: 'product',
          populate: {
            path: 'categories',
          },
        });
      }

      // .populate('owner');
      res.json({ msg: 'OrderItem of user are here:', orderItems });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const orderItems = await OrderItem.find().populate({
        path: 'product',
        populate: {
          path: 'categories',
        },
      });
      // .populate('owner');
      res.json({ msg: 'All orderItems are here:', orderItems });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  createOrderItem: async (req, res) => {
    try {
      const { product, price_on_purchase_date, quantity } = req.body;

      const newOrderItem = await new OrderItem({
        product,
        price_on_purchase_date,
        quantity,
        owner: req.user.id,
      });

      await newOrderItem.populate({
        path: 'product',
        populate: {
          path: 'categories',
        },
      });
      
      //   .populate('owner');
      await newOrderItem.execPopulate();
      await newOrderItem.save();

      res.json({ msg: 'Created order successfully', orderItem: newOrderItem });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateOrderItem: async (req, res) => {
    try {
      const { quantity } = req.body;
      if (quantity === 0) {
        const orderItem = await OrderItem.findByIdAndDelete(
          req.params.id
        ).populate('product');

        return res.json({ msg: 'Deleted orderItem', orderItem });
      }
      const orderItem = await OrderItem.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      ).populate('product');

      await orderItem.save();
      res.json({ msg: 'Updated orderItem', orderItem: orderItem });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteOrderItem: async (req, res) => {
    try {
      const orderItem = await OrderItem.findByIdAndDelete(
        req.params.id
      ).populate('product');

      res.json({ msg: 'Deleted orderItem', orderItem });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = orderItemsController;
