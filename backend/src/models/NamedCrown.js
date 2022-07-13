class NamedCrown {
    constructor(id, userID, date, type, context, line) {
        this._id = id;
        this.userID = userID;
        this.date = date;
        this.type = type;
        this.context = context;
        this.line = line;
    }
}

module.exports = NamedCrown;