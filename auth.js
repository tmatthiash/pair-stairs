const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const db = require("./src/models/index")

const isPasswordValid = async (name, password) => {
    return db.pairstair.findOne({ where: { name } })
        .then(async (foundStairs) => {
            if (foundStairs === null) {
                throw new Error(`Stair Pair with name ${name} not found`)
            }
            return await bcrypt.compare(password, foundStairs.password)
        })
};

const findPairStairsByName = async (name) => {
    const foundStairs = await db.pairstair.findOne({
        where: { name },
        attributes: {
            exclude: ['password']
        }
    })
    return foundStairs
}

passport.use('local', new Strategy({ usernameField: 'name', passwordField: 'password' }, async (name, passport, done) => {
    if (isPasswordValid(name, password)) {
        return findPairStairsByName(name);
    }
    else {
        throw new Error(`Wrong password entered for room: ${name}`);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.name);
});

passport.deserializeUser(async (name, done) => {
    const pairStair = await findPairStairsByName(name);
    return done(err, pairStair);
});
