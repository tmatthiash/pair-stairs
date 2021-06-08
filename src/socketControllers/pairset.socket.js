
const db = require("../models/index");

exports = module.exports = async (io) => {
    await io.sockets.on('connection', async (socket) => {
        await socket.on('TRIGGER_UPDATE_PAIR_SETS', async (data) => {
            const foundSets = await db.pairset.findAll({
                where: {
                    pairmatrixId: data.id
                }
            });

            const formattedSets = foundSets.map((pair) => {
                return {
                    date: pair.date,
                    userIdList: [pair.userOneId, pair.userTwoId]
                }
            })

            console.log(`emmitting ${formattedSets} to ${data.name}`)
            io.to(data.name).emit("SET_USER_PAIR_SETS", formattedSets);
        })
    })
}