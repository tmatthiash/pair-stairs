
module.exports = app => {
    const user = require("../controllers/user.controller")

    var router = require("express").Router();
  
    // router.get("/:name", users.getUsersForMatrix)

    router.post("/create/", user.create)

    router.get("/create/", user.test);
  
    app.use('/api/user', router);
  };
