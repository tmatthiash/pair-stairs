const db = require("../models");
const { Op } = require("sequelize");
const PairSet = db.pairset;
const User = db.user;

exports.setTodayPairs = async (req, res) => {
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

exports.editSinglePairSet = async (req, res) => {
    const { editedPairSet } = req.body;
    const updatedPairSet = {
        date: editedPairSet.date,
        userOneId: editedPairSet.pairList[0],
        userTwoId: editedPairSet.pairList[1],
        pairmatrixId: req.user.id
    }

    // console.log("editedPairSet ", editedPairSet);
    // console.log("updatedPairSet ", updatedPairSet);

    const matrixUsers = await User.findAll({
        where: { pairmatrixId: req.user.id }
    });

    const matrixUsersThatMatchRequest = await matrixUsers.filter((mUser) => {
        return mUser.id === editedPairSet.pairList[0] || mUser.id === editedPairSet.pairList[1]
    });
    
    if (matrixUsersThatMatchRequest.length !== 2) {
        res.status(500).send({ message: "Invalid user pair" })
    }

    PairSet.destroy({
        where: {
            [Op.or]: [{ userOneId: updatedPairSet.userOneId }, { userOneId: updatedPairSet.userTwoId }],
            [Op.or]: [{ userTwoId: updatedPairSet.userOneId }, { userTwoId: updatedPairSet.userTwoId }],
            date: updatedPairSet.date
        },
    })

    return PairSet.create(updatedPairSet)
        .then((data) => {
            res.status(200).send({ message: "Pair Set Updated" })
        })
        .catch((err) => {
            res.status(500).send();
        })
}
