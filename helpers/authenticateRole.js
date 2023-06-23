


function authenticateRole(req, res, next) {

    const user = req.user.user;
    if (!user) {
        return res.sendStatus(401)
    } else {
        let authorized = false;
        if (user.admin) {
            authorized = true;
            return next();
        } else {
            return res.status(401).json("You don't have access")
        }
    }
}

module.exports = authenticateRole;