/* eslint-disable no-console */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const db = require('./src/models/index');

function CheckPassword(username, password) {
  const modifiedName = capitalizeFirstLetter(username);

  return db.pairmatrix.findOne({ where: { name: modifiedName } }).then(
    (finduser) => {
      if (finduser === null) {
        throw new Error(`room name ${modifiedName} not found`);
      }
      const test = bcrypt.compareSync(password, finduser.password);
      return test;
    }
  );
}

function getMatrixByName(username) {
  const modifiedName = capitalizeFirstLetter(username);
  return db.pairmatrix.findOne({
    where: { name: modifiedName },
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

      if (checkPassword) {
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

const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}