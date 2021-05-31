
module.exports = app => {
    const users = require("../controllers/user.controller")

    var router = require("express").Router();
  
    router.get("/:name", users.getUsersForMatrix)
  
    app.use('/api/user', router);
  };
