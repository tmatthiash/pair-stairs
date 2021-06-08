const db = require("../models");
const PairSet = db.pairset;

exports.setTodayPairs =  async (req, res) => {
    const { pairSetList } = req.body;
    if (!pairSetList || pairSetList < 1) {
        res.status(400).send({
            message: "A pair set list is required!"
        });
        return;
    }

    await PairSet.destroy({
        where: {
            date: new Date()
        }
    });

    const pairSetToSave = pairSetList.map((ps) => {
        const newSet = {
            date: new Date(),
            userOneId: ps[0],
            userTwoId: ps[1],
            pairmatrixId: req.user.id
        }
        return newSet;
    });
    return PairSet.bulkCreate(pairSetToSave)
        .then(() => {
            res.status(201).send({ message: "Set Today's Pairs" })
        })
}

// exports.setTodayPairs = async (req, res) => {
//     console.log("in controller")
// }