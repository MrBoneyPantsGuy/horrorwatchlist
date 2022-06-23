const Movie = require('../models/Movie');
const axios = require('axios');
const storage = require('../services/storage');
const movieSelection = require('../services/movieSelection');
const availability = require('../services/availability-service');
const {json} = require('express');

exports.addMovie = async (req, res) => {
    const movieList = req.app.get('movieList');
    const regex = new RegExp("[t]{2}[0-9]{1,8}");
    const match = regex.exec(req.body.url);
    const id = (match !== null) ? match[0] : null;

    if(id === null) { // if no valid imdbID is given in the url stop here
        console.log("No valid imdbID found!");
        res.status(500).send("No valid imdbID found!");
    } else { // check if the movie is already stored
        let check = movieList.some(entry => { // some immediately returns true if an object is found and breaks the rest of the loop
            return entry.id === id;
        })

        if(check) { // movie was already stored
            console.log("Movie already in the list!");
            res.status(208).send("Movie already in the list!");
        } else { // setup api-request to fetch movie data
            let options = {
                method: 'GET',
                url: 'https://movie-database-alternative.p.rapidapi.com/',
                params: {r: 'json', i: id},
                headers: {
                    'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com',
                    'x-rapidapi-key': 'f115671c5cmshb030ae0d1d2e45cp1d9dfdjsn882285af335a'
                }
            };

            axios.request(options).then( result =>  { // fetch data and push them into the array of the app
                const values = result.data;
                if(values.Response === "False") {
                    console.log(values.Error)
                    res.status(500).send(values.Error);
                } else {
                    values.Runtime = values.Runtime.substring(0, values.Runtime.length - 4);    // remove " min" from runtime value
                    values.imdbVotes = values.imdbVotes.replace(",", "");
                    values.imdbVotes = parseInt(values.imdbVotes);
                    let movie = new Movie(values.imdbID, values.Title, values.Year, values.Director, values.imdbRating, values.Runtime, req.body.url, values.Poster, false, {}, values.imdbVotes, values.Genre, values.Plot, values.Actors);
                    movieList.push(movie);
                    req.app.set('movieList', movieList);
                    storage.saveConfig(movieList);
                    console.log(`Movie ${movie.title} added!`);
                    res.status(201).send(`Movie ${movie.title} added!`);
                }
            }).catch((err) => {
                console.error(err);
            });
        }
    }
}

exports.getMovies = async (req, res) => {
    const movieList = req.app.get('movieList');
    console.log("Fetched all movies from current list...");
    res.status(200).send(movieList);
}

exports.getUnwatchedMovies = async (req, res) => {
    let movieList = req.app.get('movieList');
    movieList = movieList.filter(movie => {
        return movie.watched === false;
    });
    console.log("Fetched all unwatched movies from current list...");
    res.status(200).send(movieList);
}

exports.getMovieById = async (req, res) => {
    const movieList = req.app.get('movieList');
    let result = movieList.filter(entry => {
        return entry.id === req.body.id;
    })
    console.log(`Trying to find movie with id ${req.body.id}`);
    result.length === 1 ? res.status(200).send(result[0]) : res.status(404).send("Movie not found!")
}

exports.getThreeRandomMovies = async (req, res) => {
    const movieList = req.app.get('movieList');
    try {
        await movieSelection.selectThreeRandomMovies(movieList).then( (result) => {
            console.log("Returned 3 movies");
            console.log(result);
            res.status(200).send(result);
        });
    } catch(err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

exports.deleteMovie = async (req, res) => {
    let movieList = req.app.get('movieList');
    const id = req.params.id;
    const deletedMovie = movieList.find(element => element.id === id);

    movieList = movieList.filter( (obj) => {
        return obj.id !== id;
    });
    req.app.set('movieList', movieList);
    storage.saveConfig(movieList);
    console.log(`Movie ${id} deleted!`);
    res.status(200).send(deletedMovie);
}

exports.watchMovie = async (req, res) => {
    let movieList = req.app.get('movieList');
    const id = req.body.id;
    let foundIndex = movieList.findIndex(movie => movie.id === id);
    if(foundIndex === -1) {
        console.log("No such movie on the list!");
        res.status(404).send("No such movie on the list!");
    } else {
        movieList[foundIndex].watched = !movieList[foundIndex].watched;
        req.app.set('movieList', movieList);
        storage.saveConfig(movieList);
        res.status(200).send(movieList[foundIndex]);
    }
}

exports.insertPersonalReview = async (req, res) => {
    let movieList = req.app.get('movieList');
    const id = req.body.id;
    const rating = req.body.personalRating;
    let foundIndex = movieList.findIndex(movie => movie.id === id);
    movieList[foundIndex].personalRating = rating;
    req.app.set('movieList', movieList);
    storage.saveConfig(movieList);
    console.log(`Review for ${movieList[foundIndex].title} added!`);
    res.status(200).send(movieList[foundIndex]);
}

exports.refreshMovie = async (req, res) => {
    let movieList = req.app.get('movieList');
    const id = req.body.id;
    let foundIndex = movieList.findIndex(movie => movie.id === id);
    if(foundIndex === -1) {
        console.log("No such movie on the list!");
        res.status(404).send("No such movie on the list!");
    } else {
        let options = {
            method: 'GET',
            url: 'https://movie-database-alternative.p.rapidapi.com/',
            params: {r: 'json', i: id},
            headers: {
                'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com',
                'x-rapidapi-key': 'f115671c5cmshb030ae0d1d2e45cp1d9dfdjsn882285af335a'
            }
        };

        axios.request(options).then( result =>  { // fetch data and push them into the array of the app
            const values = result.data;
            if(values.Response === "False") {
                console.log(values.Error)
                res.status(500).send(values.Error);
            } else {
                values.Runtime = values.Runtime.substring(0, values.Runtime.length - 4);    // remove " min" from runtime value
                values.imdbVotes = values.imdbVotes.replace(",", "");
                values.imdbVotes = parseInt(values.imdbVotes);
                let movie = new Movie(values.imdbID, values.Title, values.Year, values.Director, values.imdbRating, values.Runtime, `https://www.imdb.com/title/${id}`, values.Poster, movieList[foundIndex].watched, movieList[foundIndex].personalRating, values.imdbVotes, values.Genre, values.Plot, values.Actors);
                movieList[foundIndex] = movie;
                req.app.set('movieList', movieList);
                storage.saveConfig(movieList);
                console.log(`Movie ${movie.title} refreshed!`);
                res.status(201).send(movie);
            }
        }).catch((err) => {
            console.error(err);
        });
    }
}

exports.checkAvailability = async (req, res) => {
    let movieList = req.app.get('movieList');
    const id = req.body.id;
    let foundIndex = movieList.findIndex(movie => movie.id === id);
    if(foundIndex === -1) {
        console.log("No such movie on the list!");
        res.status(404).send("No such movie on the list!");
    } else {
        const title = movieList[foundIndex].title;
        const searchResultBFLIX = await availability.checkBFLIX(title);
        const searchResultSockShare = await availability.checkSockShare(title)
        const jsonResult = {
            "BFLIX": searchResultBFLIX.slice(0, 5),
            "SockShare": searchResultSockShare.slice(0, 5)
        }
        console.log(jsonResult);
        res.status(200).send(jsonResult);
    }
}