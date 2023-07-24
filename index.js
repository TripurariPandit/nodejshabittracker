const express = require('express');
const env = require('./config/environment');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose').MongoURI;

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy.js');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(express.urlencoded());

// To use static file
app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

const dbURL = 'mongodb+srv://tripurari:Tripurari@cluster0.8j7vazq.mongodb.net/mernstack?retryWrites=true&w=majority';

app.use(session({
    name: 'habittracker',
    secret: env.session_cookie,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongooseConnection: db,
            autoRemove: 'disabled',
            // mongoUrl:'mongodb://127.0.0.1/habitTracker'
            mongoUrl: dbURL
            // mongoUrl:'mongodb://127.0.0.1:27017/habitTracker'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

// using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`error in running server: ${err}`);
        return ;
    }
    console.log(`Server is up and running in port ${port}`);
});