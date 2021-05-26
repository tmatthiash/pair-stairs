const bcrypt = require('bcrypt');

const connectEnsureLogin = require('connect-ensure-login')
const db = require("../models");
const PairStair = db.pairstair;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    if (!req.body.name || req.body.name === "") {
        res.status(400).send({
            message: "A name is required!"
        });
        return;
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const newPairStair = {
        name: req.body.name,
        theme: "default",
        lastAccessed: new Date(),
        password: passwordHash
    }

    PairStair.create(newPairStair)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the PairStair."
            });
        });
};

exports.findByName = connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    const name = req.params.name;

    PairStair.findOne({ where: { name } })
        .then(data => {
            delete data.password;
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving pair stair with name" + name
            });
        });
};