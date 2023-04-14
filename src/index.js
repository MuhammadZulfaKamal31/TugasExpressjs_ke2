require('dotenv').config();
const express = require('express');
const cors = require('cors');

const session = require("express-session")
const db = require("./config/DataBase.js")
const SequelizeStore = require('connect-session-sequelize')
const AuthRoute = require("./routes/AuthRoute.js")
const UserRoute = require('./routes/UserRoute.js')
const ProductRoute = require("./routes/ProductRoute.js")

const app = express();
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: "auto"
    }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute)

//buat tabel session di database
store.sync();

app.listen(process.env.SERVER_PORT, () => { console.log('Server Running') });
