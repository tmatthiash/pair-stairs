const connectEnsureLogin = require('connect-ensure-login')

const db = require("../models");
const PairMatrix = db.pairmatrix;
const User = db.user;
// const PairMatrix = db.pairmatrix;

exports.getUsersByMatrixId = async (matrixId) => {
    const userArray = await User.findAll({
        where: {
            pairmatrixId: matrixId
        }
    });
    return userArray;
}

exports.create = (req, res) => {
    PairMatrix.findOne({
        where: { name: req.session.passport.user }
    }).then((foundMatrix) => {
        const newUser = {
            name: req.body.userName,
            pairmatrixId: foundMatrix.id
        }
        User.create(newUser)
            .then((data) => {
                res.status(201).send();
            })
            .catch((err) => {
                res.status(500).send();
            })
    })
}

exports.test = (res, req) => {
    res.send("success")
}