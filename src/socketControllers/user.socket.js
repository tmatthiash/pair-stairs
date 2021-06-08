
const db = require("../models/index");

exports = module.exports = async (io) => {
    await io.sockets.on('connection', async (socket) => {
        await socket.on('TRIGGER_UPDATE_USERS', async (data) => {
            const matrixUsers = await db.user.findAll({
                where: {
                    pairmatrixId: data.id
                }
            })
            const sortedUsers = matrixUsers.sort((a, b) => a.name < b.name === true ? -1 : 1)

            io.to(data.name).emit("SET_USER_LIST", sortedUsers);
        })
    })
}