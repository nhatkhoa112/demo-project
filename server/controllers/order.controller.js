const Order = require('../models/order.model.js');

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
    const { orderItems } = req.body;
    try {
      const order = await new Order({ owner, orderItems });

      await order.populate('owner').populate('orderItems');
      await order.execPopulate();
      await order.save();

      res.status(200).json({ msg: 'Created order successfully', order });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateOrder: async (req, res) => {
    res.json(req.user);
  },
  deleteOrder: async (req, res) => {
    const id = req.user.id;
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: 'Deleted order successfully', order });
    } catch (error) {}
  },
};

module.exports = ordersController;
