
module.exports = app => {
    const pairmatrix = require("../controllers/pairmatrix.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", pairmatrix.create);

    router.get("/findByName/:name", pairmatrix.findByName)
  
    app.use('/api/pairmatrix', router);
  };
