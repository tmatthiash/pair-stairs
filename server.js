require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

const db = require("./src/models/index")

db.sequelize.authenticate().then(() => {
    console.log("***Success***");
})
.catch(()=> {
    console.log("***Failure***");
})

app.use("/", express.static("frontend/dist"));
app.get("/*", (req, res) => {
    const path = require("path");
    res.sendFile(path.resolve("frontend/dist/index.html"));
})

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome" })
// });

const PORT = process.env.PORT ||8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
