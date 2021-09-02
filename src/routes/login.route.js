module.exports = app => {
    const authenticate = require("../controllers/login.controller")

    var router = require("express").Router();

    router.get("/:name", authenticate.isUserAuthenticated)

    // router.post("/", authenticate.loginToRoom)

    app.use("/api/authentication", router)
}