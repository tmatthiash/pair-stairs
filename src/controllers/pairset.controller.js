const db = require("../models");
const { Op } = require("sequelize");
const PairSet = db.pairset;
const User = db.user;

exports.setTodayPairs = async (req, res) => {
    const { pairSetList, date } = req.body;
    if (!pairSetList || pairSetList.length < 1) {
        res.status(400).send({
            message: "A pair set list is required!"
        });
        return;
    }

    await PairSet.destroy({
        where: {
            date: date,
            pairmatrixId: req.user.id
        }
    });

    pairSetList.forEach(pairSet => {
        destroyPairSetById(pairSet[0], pairSet[1])
    });

    const pairSetToSave = pairSetList.map((ps) => {
        const newSet = {
            date: date,
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

    const matrixUsers = await User.findAll({
        where: { pairmatrixId: req.user.id }
    });

    const matrixUsersThatMatchRequest = await matrixUsers.filter((mUser) => {
        return mUser.id === editedPairSet.pairList[0] || mUser.id === editedPairSet.pairList[1]
    });

    if (matrixUsersThatMatchRequest.length !== 2) {
        res.status(500).send({ message: "Invalid user pair" })
    }

    destroyPairSetById(updatedPairSet.userOneId, updatedPairSet.userTwoId)

    return PairSet.create(updatedPairSet)
        .then((data) => {
            res.status(200).send({ message: "Pair Set Updated" })
        })
        .catch((err) => {
            res.status(500).send();
        })
}

const destroyPairSetById = (pairSetIdOne, pairSetIdTwo) => {
    PairSet.destroy({
        where: {
            [Op.or]: [{
                [Op.and]: [
                    { userOneId: pairSetIdOne },
                    { userTwoId: pairSetIdTwo }]
            }, {
                [Op.and]: [
                    { userOneId: pairSetIdTwo },
                    { userTwoId: pairSetIdOne }]
            }]
        }
    })
}
