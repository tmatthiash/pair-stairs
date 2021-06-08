module.exports = (sequelize, Sequelize) => {
    const PairMatrix = sequelize.define("pairmatrix", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        theme: {
            type: Sequelize.STRING
        },
        lastAccessed: {
            type: Sequelize.DATE
        }
    });

    return PairMatrix;
};