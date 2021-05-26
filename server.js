require('dotenv').config()
const passport = require('passport');
const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('static'));

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


const db = require("./src/models/index")

db.sequelize.authenticate().then(() => {
    console.log("***Success***");
})
    .catch(() => {
        console.log("***Failure***");
    })

// db.sequelize.sync({ force: true })
db.sequelize.sync();

app.use("/", express.static("frontend/dist"));
app.get("/*", (req, res) => {
    const path = require("path");
    res.sendFile(path.resolve("frontend/dist/index.html"));
})

require('./auth');
app.use(passport.initialize());
app.use(passport.session());

require("./src/routes/pairstair.route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
