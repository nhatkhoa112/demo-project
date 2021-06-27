const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name!'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email!'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password!'],
    },
    orders: [{ ref: 'Order', type: Schema.Types.ObjectId, trim: true }],
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
  const userObj = new this(); // create a new User class
  this.findOne({ email: profile.email }, async function (err, result) {
    if (!result) {
      let newPassword =
        profile.password || '' + Math.floor(Math.random() * 100000000);
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);

      userObj.name = profile.name;
      userObj.email = profile.email;
      userObj.password = newPassword;
      userObj.googleId = profile.googleId;
      userObj.facebookId = profile.facebookId;
      userObj.avatarUrl = profile.avatarUrl;
      userObj.save(cb);
    } else {
      cb(err, result);
    }
  });
};

userSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User', userSchema);
