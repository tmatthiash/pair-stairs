module.exports = (sequelize, Sequelize) => {
    const PairSet = sequelize.define("pairset", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATEONLY
        },
        userOneId: {
            type: Sequelize.UUID
        },
        userTwoId: {
            type: Sequelize.UUID
        }
    });

    return PairSet;
};