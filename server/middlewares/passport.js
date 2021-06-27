const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const User = require('../models/user.model');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new FacebookTokenStrategy(
    {
      fbGraphVersion: 'v3.0',
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
    },
    function (_, _, profile, done) {
      User.findOrCreate(
        {
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        },
        function (error, user) {
          return done(error, user);
        }
      );
    }
  )
);
