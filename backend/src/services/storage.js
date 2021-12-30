const fs = require('fs');
const Movie = require('../models/Movie');
const User = require('../models/User');

exports.saveConfig = (config) => {
    fs.writeFile('./data/config.json', JSON.stringify(config), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

exports.loadConfig = (config) => {
    let resultConfig = [];
    config.forEach(entry => {
        resultConfig.push(new Movie(entry.id, entry.title, entry.year, entry.director, entry.rating, entry.runtime, entry.imdbLink, entry.posterLink, entry.watched, entry.personalRating, entry.votes, entry.genre, entry.plot, entry.actors));
    });
    return resultConfig;
}

exports.saveAuth = (auth) => {
    let data = { "userdata": auth }
    fs.writeFile('./data/auth.json', JSON.stringify(data), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

exports.loadAuth = (auth) => {
    let users = [];
    auth.userdata.forEach(user => {
        users.push(new User(user.username, user.passwordHash, user.loginAttempts, user.success, user.disabled, user.email, user.isAdmin));
    })

    return users;
}