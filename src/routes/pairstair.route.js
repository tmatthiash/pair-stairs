module.exports = app => {
    const pairstairs = require("../controllers/pairstair.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", pairstairs.create);
  
    app.use('/api/pairstairs', router);
  };