/**
 * endpoint, which returns information about the user, which is currently authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
const dbService = require('../services/db-service');

exports.getSelf = async (req, res) => {
    res.send(req.session.user); //retrieve userdata of authenticated user from session and return it
}

exports.getAllUsers = async (req, res) => {
    let users = await dbService.fetchUsers();
    users.forEach(user => {
        delete user.passwordHash;
        delete user.loginAttempts;
        delete user.disabled;
        delete user.success;
    });
    res.status(200).send(users);
}

exports.incrementCrowns = async (req, res) => {
    const data = req.body;
    let result = await dbService.incrementCrownsForUser(data._id, parseInt(data.amount));
    if(result) {
        res.status(200).send({status: "Ok"});
    } else {
        res.status(500).send({status: "Error"});
    }
}

exports.getNamedCrownsByUserID = async (req, res) => {
    const data = req.body;
    let result = await dbService.fetchNamedCrownsByUserID(data.userID);
    res.status(200).send(result);
}

exports.createNamedCrownForUser = async(req, res) => {
    const data = req.body;
    let result = await dbService.createNamedCrown(data.crown);
    if(result) res.status(200).send("Ok!");
    else res.status(500).send("DB-Error!");
}