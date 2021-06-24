const OrderItem = require('../models/orderItem.model.js');
const Order = require('../models/order.model.js');

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
      });

      await newOrderItem.populate({
        path: 'product',
        populate: {
          path: 'categories',
        },
      });

      await newOrderItem.execPopulate();
      await newOrderItem.save();

      res.json({ msg: 'Created order successfully', orderItem: newOrderItem });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateOrderItem: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { quantity, pending } = req.body;
      if (quantity === 0) {
        const orderItem = await OrderItem.findByIdAndDelete(
          req.params.id
        ).populate('product');

        const order = await Order.findById(orderId)
          .populate({
            path: 'orderItems',
            model: 'OrderItem',
            populate: { path: 'product', model: 'Product' },
          })
          .populate({ path: 'owner', model: 'User' });

        let idu = order.orderItems.findIndex((or) => or._id === orderItem._id);
        order.orderItems.splice(idu, 1);
        await order.save;

        return res.json({ msg: 'Deleted orderItem', order });
      }
      const orderItem = await OrderItem.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      ).populate('product');

      await orderItem.save();

      const order = await Order.findById(orderId)
        .populate({
          path: 'orderItems',
          model: 'OrderItem',
          populate: { path: 'product', model: 'Product' },
        })
        .populate({ path: 'owner', model: 'User' });

      let idu = order.orderItems.findIndex((or) => or._id === orderItem._id);
      order.orderItems[idu] = orderItem;
      await order.save;

      res.json({ msg: 'Updated orderItem', order: order });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteOrderItem: async (req, res) => {
    try {
      const { orderId } = req.params;
      const orderItem = await OrderItem.findByIdAndDelete(
        req.params.id
      ).populate('product');

      const order = await Order.findById(orderId)
        .populate({
          path: 'orderItems',
          model: 'OrderItem',
          populate: { path: 'product', model: 'Product' },
        })
        .populate({ path: 'owner', model: 'User' });

      let idu = order.orderItems.findIndex((or) => or._id === orderItem._id);
      order.orderItems.splice(idu, 1);
      await order.save;

      res.json({ msg: 'Deleted orderItem', order });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = orderItemsController;
