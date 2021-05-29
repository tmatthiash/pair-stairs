/* eslint-disable no-console */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const db = require('./src/models/index');

function CheckPassword(username, password) {
    console.log("check password")
  return db.pairmatrix.findOne({ where: { name: username } }).then(
    (finduser) => {
      if (finduser === null) {
        throw new Error(`email address ${username} not found`);
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
        console.log("doing auth shit")
      const checkPassword = await CheckPassword(username, password);

        if(checkPassword) {
            return getMatrixByName(username)
            .then((user) => {
                console.log("returning ", user)
                return done(null, user)
            })
            .catch((err) => {
                return done(err)
            })
        }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('serializing', user.name);
  done(null, user.name);
});

passport.deserializeUser((user, done) => {
  console.log('de-serializing', user);
  getMatrixByName(user).then((user, err) => {
    return done(err, user);
  });
});
