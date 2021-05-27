
exports.isUserAuthenticated = (req, res) => {
    if (req.session.user) {
        res.status(200).send({ isUserAuthenticated: true })
    } else {
        res.status(200).send({ isUserAuthenticated: false })
    }
}