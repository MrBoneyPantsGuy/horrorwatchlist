class User {
    constructor(username, passwordHash, loginAttempts, success, disabled, email, isAdmin) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.loginAttempts = loginAttempts;
        this.disabled = disabled;
        this.success = success;
        this.email = email;
        this.isAdmin = isAdmin;
    }
}

module.exports = User;