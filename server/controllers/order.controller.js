const Order = require('../models/order.model.js');
const OrderItem = require('../models/orderItem.model.js');
const User = require('../models/user.model.js');

const ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate('orderItems');
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

        await orderItem.populate('product');
        await orderItem.execPopulate();
        orderItem.save();
        order.orderItems.push(orderItem._id);
      });

      await order.populate('owner');
      await order.populate({
        path: 'orderItem',
        populate: {
          path: 'product',
        },
      });
      await order.execPopulate();
      await order.save();

      const user = await User.findById(req.user.id);
      user.orders.push(order._id);
      await user.save();

      res.status(200).json({ msg: 'Created order successfully', order });
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

      res.status(200).json({ msg: 'Deleted order successfully', order });
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
};

module.exports = ordersController;
