const Order = require('../models/order.model.js');
const OrderItem = require('../models/orderItem.model.js');
const User = require('../models/user.model.js');

const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate({
          path: 'orderItems',
          model: 'OrderItem',
          populate: { path: 'product', model: 'Product' },
        })
        .populate({ path: 'owner', model: 'User' });
      res.status(200).json({ msg: 'All orders is here:', orders });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getOrderOfUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const id = req.user.id;
      if (id !== userId)
        return res.status(400).json('This is not your account');

      const orders = await Order.find({ owner: id });
      await orders.populate('owner');
      await orders.execPopulate();
      await orders.save();

      res.status(200).json({ msg: 'All orders is here:', orders });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  createOrder: async (req, res) => {
    const owner = req.user.id;
    const { shippingAddress, totals, orderUser } = req.body;
    try {
      const order = await new Order({ owner, shippingAddress, totals });

      orderUser.map(async (orderU) => {
        const orderItem = await new OrderItem({
          owner: req.user.id,
          product: orderU.product._id,
          quantity: orderU.quantity,
          price_on_purchase_date: orderU.price_on_purchase_date,
        });

        orderItem.save();
        order.orderItems.unshift(orderItem._id);
      });

      await order.save();

      const newOrder = await Order.findOne({ _id: order._id })
        .populate({
          path: 'orderItems',
          model: 'OrderItem',
          populate: {
            path: 'product',
            model: 'Product',
            populate: {
              path: 'categories',
              model: 'Category',
            },
          },
        })
        .populate('owner');

      const user = await User.findById(req.user.id);
      user.orders.push(order._id);
      await user.populate({
        path: 'orders',
        model: 'Order',
        populate: {
          path: 'orderItems',
          model: 'OrderItem',
          populate: {
            path: 'product',
            model: 'Product',
            populate: {
              path: 'categories',
              model: 'Category',
            },
          },
        },
      });
      await user.execPopulate();
      await user.save();

      res
        .status(200)
        .json({ msg: 'Created order successfully', order: newOrder, user });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );

      if (!order)
        return res.status(404).json({ msg: 'The order is not exists.' });

      res.status(200).json({ msg: 'Updated order successfully', order });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order)
        return res.status(404).json({ msg: 'The order is not exists.' });
      res.status(200).json({ msg: 'Deleted order successfully', order });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id)
        .populate({ path: 'owner', model: 'User' })
        .populate({
          path: 'orderItems',
          model: 'OrderItem',
          populate: { path: 'product', model: 'Product' },
        });
      if (!order) return res.status(400).json({ msg: 'Order not found!' });
      res.status(200).json({ msg: 'The order is here:', order });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = ordersController;
