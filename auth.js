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
    (username, password, done) => {
        console.log("doing auth shit")
      const checkPassword = CheckPassword(username, password);

      return checkPassword
        .then((isLoginValid) => {
          if (isLoginValid) {
            return getMatrixByName(username);
          }

          throw new Error(`${username} Entered wrong password`);
        })
        .then((user) => {
          console.log('User Logged In');
          return done(null, user);
        })
        .catch((err) => {
          console.log('Log in error');
          return done(err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('serializing', user);
  done(null, user.name);
});

passport.deserializeUser((name, done) => {
  console.log('de-serializing');
  getMatrixByName(name).then((user, err) => {
    return done(err, user);
  });
});
