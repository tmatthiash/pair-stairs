
const db = require("../models/index");

exports = module.exports = async (io) => {
    await io.sockets.on('connection', async (socket) => {
        await socket.on('TRIGGER_UPDATE_USERS', async (data) => {
            console.log("auth in User, ", io.socket.request);
        })
    })
}