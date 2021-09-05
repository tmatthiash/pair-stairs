const connectEnsureLogin = require('connect-ensure-login')

const db = require("../models");
const PairMatrix = db.pairmatrix;
const User = db.user;
const PairSet = db.pairset;
const { Op } = require("sequelize");

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
    console.log("req ", req)
    console.log("user", req.user);
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

exports.remove = async (req, res) => {
    const foundMatrix = await PairMatrix.findOne({
        where: { name: req.session.passport.user }
    });
    const foundUser = await User.findOne({
        where: { id: req.body.userId }
    });
    if (foundMatrix.id !== foundUser.pairmatrixId) {
        console.log(foundMatrix.id, foundUser.pairmatrixId)
        res.status(401).send();
    }
    else {
        const foundPairSets = await PairSet.findAll({
            where: {
                [Op.or]: [
                    { userOneId: foundUser.id },
                    { userTwoId: foundUser.id }
                ]
            }
        });

        const pairSetIds = foundPairSets.map((set) => set.id);

        await foundUser.destroy();
        PairSet.destroy({ where: { id: pairSetIds } })

        res.status(204).send();
    }
}

exports.test = (res, req) => {
    res.send("success")
}