const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionMiddleware = session({
    secret: 'yourSecretKey', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:5173/blog',
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
});

module.exports = sessionMiddleware;