const connectEnsureLogin = require('connect-ensure-login')

module.exports = app => {
    const pairstairs = require("../controllers/pairstair.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", pairstairs.create);

    router.get("/findByName/")
  
    app.use('/api/pairstairs', router);
  };

  // app.get('/',
  // connectEnsureLogin.ensureLoggedIn(),
  // (req, res) => res.sendFile('html/index.html', {root: __dirname})
// );