
module.exports = app => {
    const users = require("../controllers/user.controller")

    var router = require("express").Router();
  
    router.get("/:name", users.getUsersForMatrix)

    router.get("/create/", users.create)
  
    app.use('/api/user', router);
  };
