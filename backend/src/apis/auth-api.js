const authService = require('../services/auth-service');

exports.login = async (req, res) => {
    let auth = req.app.get('auth');
    const credentials = req.body;

    // does the given user exist?
    auth = auth.filter( (user) => {
        return user.username === credentials.username;
    });

    if(auth.length > 0) {
        if(auth[0].passwordHash === credentials.passwordHash) {
            authService.authenticate(req.session, auth[0]); //mark session as authenticated
            res.status(200).send('login successful');
        } else {
            res.status(401).send('login failed');
        }
    } else {
        res.status(401).send('invalid user');
    }
}

/**
 * endpoint, which handles logout
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.logout = function (req, res){
    console.log(req.session);
    authService.deAuthenticate(req.session); //destroy session
    res.send('logout successful');
}

/**
 * endpoint, which returns whether a user is authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.isLoggedIn = function (req, res){
    if(authService.isAuthenticated(req.session)){ //check via auth-service
        res.send({loggedIn: true});
    }else {
        res.send({loggedIn: false});
    }
}