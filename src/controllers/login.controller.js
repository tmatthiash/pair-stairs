const passport = require("passport");

exports.isUserAuthenticated = (req, res) => {
    console.log("authenticating req ", req)
    console.log("sessionInfo ", req.session)
    console.log("user ", req.user);
    // res.status(200).send();
    // return;
    console.log("Tha User ", req.user);
    if (req.session.passport.user) {
        res.status(200).send({ isUserAuthenticated: true })
    } else {
        res.status(200).send({ isUserAuthenticated: false })
    }
}



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