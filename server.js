require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const loginController = require('./src/controllers/login.controller')
const express = require("express");
const cors = require("cors");


const app = express();

// let corsOptions = {
//     origin: "http://localhost:8081"
// };

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(
//     session({
//         genid: () => {
//             return uuidv4();
//         },
//         saveUninitialized: true,
//         resave: true,
//         rolling: true,
//         // TODO: add secret to env
//         secret: 'kjdfkshdfkjxldnfue',
//         cookie: {
//             maxAge: 36000000,
//             httpOnly: true,
//             secure: true
//         }
//     })
// );


const db = require("./src/models/index")

db.sequelize.authenticate()
    .then(() => {
        console.log("***Success***");
    })
    .catch(() => {
        console.log("***Failure***");
    })

// db.sequelize.sync({ force: true })
db.sequelize.sync();

app.use(cors({ origin: true, credentials: true }));

app.use("/", express.static("frontend/dist"));
app.get("/", (req, res) => {
    const path = require("path");
    res.sendFile(path.resolve("frontend/dist/index.html"));
})

// app.use(cors(corsOptions));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static('static'));

app.use(cookieParser('keyboard cat'));


app.use(session({
    genid: () => {
        return uuidv4();
    },
    name: "pairCookie",
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 9000000,
        httpOnly: true,
        secure: false
    }
}
));

require('./auth');

app.use(passport.initialize());
app.use(passport.session());

// app.post('/login',
//     passport.authenticate('local', {failWithError:}),
//     function (req, res) {
//         res.status(200).send();
//         console.log("auth happened")
//     });

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


// app.post('/login', loginController.login);

require("./src/routes/login.route")(app);

// app.post('/login', loginController.login);
require("./src/routes/pairmatrix.route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
