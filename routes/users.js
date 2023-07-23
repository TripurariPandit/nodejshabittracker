const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller')

// For user sign up
router.get('/sign-up', usersController.signUp);

// for user sign in
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

// for user logout
router.get('/sign-out', usersController.destroySession);

// these are for forgetPassowrd. one router will redirect to forgetPassword Page, and other will change the password
router.use('/forgetPassword' , usersController.forgetPasswordPage);
router.use('/forgetPasswordPage', usersController.forgetPasswordLink);

module.exports = router;