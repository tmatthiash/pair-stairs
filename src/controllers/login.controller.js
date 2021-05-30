const passport = require("passport");
const { user } = require("../models");

exports.isUserAuthenticated = (req, res) => {
    console.log(req.session)
    if(!req.session){
        return res.status(200).send({ isUserAuthenticated: false })
    }
    if(!req.session.passport){
        return res.status(200).send({ isUserAuthenticated: false })
    }
    if (req.session.passport.user) {
        return res.status(200).send({ isUserAuthenticated: true })
    } else {
        return res.status(200).send({ isUserAuthenticated: false })
    }
}


exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return res
          .status(401)
          .send({ errorMessage: 'Invalid email or password' });
      }
      return res.status(200).send();
    })(req, res, next);
  };
  



// exports.login = (req, res, next) => {
//     const { user } = req.body;
//     const loginUser = { ...user };
//     console.log(user);
//     passport.authenticate('local', (err, user) => {
//         console.log("user2 ", loginUser)
//         if (err) {
//             return res
//                 .status(400)
//                 .send({ errorMessage: 'Invalid email or password' });
//         }
//         req.logIn(loginUser, (errHandle) => {
//             console.log("user login ", loginUser);
//             if (errHandle) {
//                 console.log(errHandle);
//             }
//         });

//         return res.status(200).send();
//     })(req, res, next);
// };