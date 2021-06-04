const connectEnsureLogin = require('connect-ensure-login')

const db = require("../models");
const PairMatrix = db.pairmatrix;
const User = db.user;
// const PairMatrix = db.pairmatrix;

exports.getUsersByMatrixId = connectEnsureLogin.ensureLoggedIn(), async (matrixId) => {
    const userArray = await User.findAll({
        where: {
            pairmatrixId: matrixId
        }
    });
    return userArray;
}

exports.create = connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    PairMatrix.findOne({
        where: { name: req.session.passport.user }
    }).then((foundMatrix) => {
        const newUser ={
            name:req.params.userName,
            pairmatrixId: foundMatrix.id
        }
        this.getUsersByMatrixId.create(newUser)
        .then((data) => {
            res.status(201).send();
        })
        .catch((err) => {
            res.status(500).send();
        })
    })
}