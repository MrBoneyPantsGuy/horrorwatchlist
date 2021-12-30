/**
 * this model specifies the format to exchange credentials with the frontend
 * @param {string} username
 * @param {string} password
 */
class Credentials{
    constructor(username, passwordHash) {
        this.username = username;
        this.passwordHash = passwordHash;
    }
}

module.exports = Credentials;