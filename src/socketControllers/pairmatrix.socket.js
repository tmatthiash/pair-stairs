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
            const sortedUsers = foundUsers.sort((a, b) => a.name < b.name === true ? -1 : 1)

            const foundSets = await db.pairset.findAll({
                where: {
                    pairmatrixId: foundMatrix.id
                }
            });

            const formattedSets = foundSets.map((pair) => {
                return {
                    date: pair.date,
                    userIdList: [pair.userOneId, pair.userTwoId]
                }
            })

            const matrixData = {
                pairMatrix: foundMatrix,
                users: sortedUsers,
                pairSets: formattedSets
            }
            io.to(matrixName).emit("UPDATE_MATRIX_INFO", matrixData);
        })
    })
}
