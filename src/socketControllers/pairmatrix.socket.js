// const PairMatrix = require("../controllers/pairmatrix.controller");
// const Users = require("../controllers/user.controller");
const db = require("../models/index")

exports = module.exports = async (io) => {
    await io.sockets.on('connection', async (socket) => {
        await socket.on('join', async (data) => {
            if (!data) {
                return;
            }
            if (!data.matrixName) {
                return;
            }
            const { matrixName } = data;
            socket.join(matrixName);
            const foundMatrix = await db.pairmatrix.findOne({
                where: { name: matrixName },
                attributes: {
                    exclude: ['password']
                }
            })
            const foundUsers = await db.user.findAll({
                where: { pairmatrixId: foundMatrix.id }
            })
            const matrixData = {
                pairMatrix: foundMatrix,
                users: foundUsers
            }
            console.log("sending back matrix ", matrixData)
            io.to(matrixName).emit("UPDATE_MATRIX_INFO", matrixData);
        })
    })
}

// exports = module.exports = function(io){
//     console.log("hit controller")
//     io.sockets.on('connection', function (socket) {
//       socket.on('join', function (data) {
//           console.log("join data, ", data);
//         io.to(data).emit("UPDATE_MATRIX_INFO", "helllllloooo");
//       });
//     });
//   }