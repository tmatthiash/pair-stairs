const bcrypt = require('bcrypt');

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
        date: new Date(),
        password: passwodHash
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