/* eslint-disable no-console */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const db = require('./src/models/index');

function CheckPassword(username, password) {
  return db.pairmatrix.findOne({ where: { name: username } }).then(
    (finduser) => {
      console.log(finduser)
      if (finduser === null) {
        throw new Error(`room name ${username} not found`);
      }
      const test = bcrypt.compareSync(password, finduser.password);
      return test;
    }
  );
}

function getMatrixByName(username) {
  return db.pairmatrix.findOne({
    where: { name: username },
    attributes: {
      exclude: ['password']
    }
  });
}

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'name', passwordField: 'password' },
    async (username, password, done) => {
      const checkPassword = await CheckPassword(username, password);

        if(checkPassword) {
            return getMatrixByName(username)
            .then((user) => {
                return done(null, user)
            })
            .catch((err) => {
                return done(err)
            })
        }
        else {
            return done(null);
        }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.name);
});

passport.deserializeUser((user, done) => {
  getMatrixByName(user).then((user, err) => {
    return done(err, user);
  });
});
