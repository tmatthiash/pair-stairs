module.exports = app => {
    const authenticate = require("../controllers/authentication.controller")

    var router = require("express").Router();

    router.get("/", authenticate.isUserAuthenticated)

    app.use("api/authentication", router)
}