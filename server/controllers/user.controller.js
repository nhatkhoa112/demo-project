const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const fetch = require('node-fetch');

const { CLIENT_URL } = process.env;

const userController = {
  register: async (req, res) => {
    try {
      let { name, email, password, avatar } = req.body;
      if (!name || !email || !password)
        return res.status(400).json({ msg: 'Please fill in all fields.' });

      if (!validateEmail(email))
        return res.status(400).json({ msg: 'Invalid emails.' });

      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: 'This email already exists.' });

      if (!avatar) {
        avatar =
          'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png';
      }

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters.' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
        avatar,
      };

      const newUser1 = await User(newUser);

      await newUser1.save();

      const accesstoken = createAccessToken({ id: newUser1._id });
      const refreshtoken = createRefreshToken({ id: newUser1._id });

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: 'api/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({
        msg: 'Create account successfully!',
        data: { accesstoken, user: newUser1 },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  activateEmail: async (req, res) => {},

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
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

      if (!user)
        return res.status(400).json({ msg: 'The email is incorrect.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) res.status(400).json({ msg: 'The password is incorrect.' });
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: 'api/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });
      res.json({ msg: 'Login success!', data: { accesstoken, user } });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: 'Please Login or Register' });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: 'Please Login or Register' });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: 'This email does not exist.' });

      const accesstoken = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${accesstoken}`;

      sendMail(email, url, 'Reset your password');
      res.json({ msg: 'Re-send the password, please check your email.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: 'Password successfully changed!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserInfor: async (req, res) => {
    try {
      const user = await User.findById(req.user.id, { password: 0 });
      if (!user)
        return res.status(400).json({ msg: 'Invalid Authentication.' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getUsersAllInfor: async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });
      res.json(users);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: 'api/user/refresh_token' });
      return res.json({ msg: 'Logged out.' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      delete req.body.role;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { ...req.body },
        { new: true }
      );

      res.json({ msg: 'Update Success!.', data: { user } });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body;
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { role },
        { new: true }
      );
      res.json({ msg: 'Update success!', data: { user } });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.id });

      res.json({ msg: 'Delete success!', data: { user } });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  googleLogin: async (req, res) => {},
  facebookLogin: async ({ user }, res) => {
    if (user) {
      user = await User.findByIdAndUpdate(
        user._id,
        { avatarUrl: user.avatarUrl },
        { new: true }
      );
    } else {
      throw new Error('There is No User');
    }

    const accesstoken = createAccessToken({ id: user._id });
    res.status(200).json({ status: 'success', data: { user, accessToken } });
  },

  test: async (req, res) => {
    try {
      res.json({ msg: 'Hello Production' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  testDb: async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });
      res.json({ msg: 'Hello Production', data: { users } });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = userController;
