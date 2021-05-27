const bcrypt = require('bcrypt');

const connectEnsureLogin = require('connect-ensure-login')
const db = require("../models");
const PairMatrix = db.pairmatrix;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    if (!req.body.name || req.body.name === "") {
        res.status(400).send({
            message: "A name is required!"
        });
        return;
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const newPairMatrix = {
        name: req.body.name,
        theme: "default",
        lastAccessed: new Date(),
        password: passwordHash
    }

    PairMatrix.create(newPairMatrix)
        .then(data => {
            const response = {...data, password: "That's Secret"}
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pair Matrix."
            });
        });
};

exports.findByName = connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    const name = req.params.name;

    PairMatrix.findOne({
        where: { name },
        attributes: {
            exclude: ['password']
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving pair matrix with name" + name
            });
        });
};