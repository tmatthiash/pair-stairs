module.exports = (sequelize, Sequelize) => {
    const PairStair = sequelize.define("pairstair", {
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
            type: Sequelize.BOOLEAN
        },
        lastAccessed: {
            type: Sequelize.DATE
        }
    });

    return PairStair;
};