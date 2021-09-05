const bcrypt = require('bcrypt');
const passport = require('passport');

const connectEnsureLogin = require('connect-ensure-login')
const db = require("../models");
const PairMatrix = db.pairmatrix;


exports.create = async (req, res) => {
    if (!req.body.name || req.body.name === "") {
        res.status(400).send({
            message: "A name is required!"
        });
        return;
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const modifiedName = capitalizeFirstLetter(req.body.name);

    const newPairMatrix = {
        name: modifiedName,
        theme: "default",
        lastAccessed: new Date(),
        password: passwordHash
    }

    PairMatrix.create(newPairMatrix)
        .then(data => {
            const response = { ...data, password: "That's Secret" }
            res.status(201).send(response);
        })
        .catch(err => {
            console.log("res: ", err)

            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pair Matrix."
            });
        });


};

exports.findByName = connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    const name = req.params.name;

    const modifiedName = capitalizeFirstLetter(req.body.name);


    if (req.params.name !== req.user.dataValue.name) {
        return res.status(401).send();
    }

    PairMatrix.findOne({
        where: { name: modifiedName },
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

const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}