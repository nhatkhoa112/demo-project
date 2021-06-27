const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const passport = require('../middlewares/passport');

router.post('/register', userController.register);

router.post('/activation', userController.activateEmail);

router.post('/login', userController.login);

router.post('/refresh_token', userController.getAccessToken);

router.post('/forgot', userController.forgotPassword);

router.post('/reset', auth, userController.resetPassword);

router.get('/infor', auth, userController.getUserInfor);

router.get('/all_infor', auth, authAdmin, userController.getUsersAllInfor);

router.get('/logout', userController.logout);

router.patch('/update', auth, userController.updateUser);

router.patch(
  '/update_role/:id',
  auth,
  authAdmin,
  userController.updateUsersRole
);

// router.post(
//   '/login/facebook',
//   passport.authenticate('facebook-token', { session: false }),
//   userController.facebookLogin
// );

router.delete('/delete/:id', auth, authAdmin, userController.deleteUser);

router.get('/test', userController.test);

router.get('/testDb', userController.testDb);

module.exports = router;
