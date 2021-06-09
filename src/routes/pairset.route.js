
module.exports = app => {
    const pairset = require("../controllers/pairset.controller")

    var router = require("express").Router();

    router.post("/batch-create/", pairset.setTodayPairs);

    router.put("/editSinglePairSet/", pairset.editSinglePairSet);

    app.use('/api/pairset', router);
};
