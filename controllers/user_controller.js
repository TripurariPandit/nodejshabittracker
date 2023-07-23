const User = require('../model/user');

// render the sign Up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('sign_up', {
        title: "Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('sign_in', {
        title: "Sign In"
    });
}

// get the sign up data
module.exports.create = async function (req, res) {
    try {
        if (req.body.password !== req.body.confirmPassword) {
            return res.redirect('back');
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in creating user while signing up', err);
    }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

// Sign-out
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged out');
        res.redirect('/');
    });
}

// forrget password page
module.exports.forgetPasswordPage = function (req, res) {
    return res.render('forget_password', {
        title: 'Forget Password'
    });
}

// this will update the existing password, with the newly created password.
module.exports.forgetPasswordLink = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.redirect('/users/sign-up');
        }
        if (req.body.password == req.body.confirmPassword) {
            user.password = req.body.password;
            await user.updateOne({ password: req.body.password });
            return res.redirect('/users/sign-in');
        }
        return res.redirect('back');
    }
    catch (err) {
        console.log('Error in froget password', err);
    }
}