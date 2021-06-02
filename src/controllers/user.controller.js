const connectEnsureLogin = require('connect-ensure-login')

const db = require("../models");
const User = db.user;
const PairMatrix = db.pairmatrix;

// exports.getUsersForMatrix = connectEnsureLogin.ensureLoggedIn(),
//     async (req, res) => {
//         const name = req.params.name;
//         const foundMatrix = await PairMatrix.findOne({
//             where: { name }
//         })
//         const userArray = await User.findAll({
//             where: {
//                 pairmatrixId= foundMatrix.id
//             }
//         });
//         res.send({ userArray })
//     };

exports.getUsersByMatrixId = connectEnsureLogin.ensureLoggedIn(), async (matrixId) => {
    const userArray = await User.findAll({
        where: {
            pairmatrixId: matrixId
        }
    });
    return userArray;
}