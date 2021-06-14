const OrderItem = require('../models/orderItem.model.js');

const orderItemsController = {
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
      const { product, price_on_purchase_date, quantity, order_id } = req.body;

      const orderItem = await OrderItem.findOne({
        product,
        owner: req.user.id,
        status: false,
      });

      if (orderItem) {
        const newOrderItem = await OrderItem.findByIdAndUpdate(orderItem._id, {
          $set: { quantity: orderItem.quantity + quantity },
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

        return res.json({
          msg: 'Updated order successfully',
          orderItem: newOrderItem,
        });
      }

      const newOrderItem = await new OrderItem({
        product,
        price_on_purchase_date,
        quantity,
        owner: req.user.id,
        order_id,
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
      const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
      //   .populate('product');

      res.json({ msg: 'Deleted orderItem', orderItem });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = orderItemsController;
