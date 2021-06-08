module.exports = app => {
    const authenticate = require("../controllers/login.controller")

    var router = require("express").Router();

    router.get("/", authenticate.isUserAuthenticated)

    app.use("/api/authentication", router)
}