require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const express = require("express");
const cors = require("cors");
var history = require('connect-history-api-fallback');



const app = express();
app.use(history());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const db = require("./src/models/index")

db.sequelize.authenticate()
    .then(() => {
        console.log("***Success***");
    })
    .catch(() => {
        console.log("***Failure***");
    })

db.sequelize.sync();

app.use(cors({ origin: true, credentials: true }));

app.use("/", express.static("frontend/dist"));
app.get("/", (req, res) => {
    const path = require("path");
    res.sendFile(path.resolve("frontend/dist/index.html"));
})

app.use(express.static('static'));

app.use(cookieParser('keyboard cat'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const sessionMiddleware = session({
    genid: () => {
        return uuidv4();
    },
    name: "pairCookie",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 9000000,
        httpOnly: true,
        secure: false
    }
});

app.use(sessionMiddleware);

require('./auth');

app.use(passport.initialize());
app.use(passport.session());


app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({ success: false, message: 'authentication failed' });
        }
        req.login(user, loginErr => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.send({ success: true, message: 'authentication succeeded' });
        });
    })(req, res, next);
});

require("./src/routes/user.route")(app);
require("./src/routes/login.route")(app);
require("./src/routes/pairmatrix.route")(app);
require("./src/routes/pairset.route")(app);

const server = require('http').createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

require("./src/socketControllers/pairmatrix.socket")(io);
require("./src/socketControllers/user.socket")(io);
require("./src/socketControllers/pairset.socket")(io);


const PORT = process.env.PORT || 8080;

server.listen(PORT, function () {
    console.log(`listening on ${PORT}`);
});