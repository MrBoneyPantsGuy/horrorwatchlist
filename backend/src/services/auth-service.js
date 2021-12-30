const User = require('../models/User');

const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

/**
 * marks user's session as authenticated
 * @param session current session
 * @param {User} user information about the current user
 */

exports.authenticate = function (session, user){
    session.authenticated = true;
    let userDto = new User(capitalize(user.username), null, null, null, null, user.email, user.isAdmin);
    session.user = userDto;
}

/**
 * checks session, if user is authenticated
 * @param session current session
 * @return {boolean} true if user is authenticated
 */
exports.isAuthenticated = function (session){
    return session.authenticated ? true : false;
}

/**
 * resets session to a 'non authenticated' state
 * @param session current session
 */
exports.deAuthenticate = function (session){
    session.authenticated = false;
    session.user = undefined;
    session.destroy();
}