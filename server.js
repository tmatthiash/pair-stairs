require('dotenv').config()
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

const db = require("./src/models/index")

db.sequelize.authenticate().then(() => {
    console.log("***Success***");
})
.catch(()=> {
    console.log("***Failure***");
})

db.sequelize.sync({ force: true })

app.use("/", express.static("frontend/dist"));
app.get("/*", (req, res) => {
    const path = require("path");
    res.sendFile(path.resolve("frontend/dist/index.html"));
})

require("./src/routes/pairstair.route")(app);

const PORT = process.env.PORT ||8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
