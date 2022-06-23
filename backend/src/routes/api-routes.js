const express = require('express');
const router = express.Router();
const {checkAuthorization} = require('../middlewares/auth-middleware');

const authApi = require('../apis/auth-api');
router.post('/login', authApi.login);                           // the function decides which request type should be accepted
router.delete('/login', checkAuthorization(),authApi.logout);   // middlewares can be defined in parameters
router.get('/login', authApi.isLoggedIn);                       // the function, which handles requests is specified as the last parameter

const userApi = require('../apis/user-api');
router.get('/user', userApi.getSelf);

const movieApi = require('../apis/movie-api');
router.get('/movies', checkAuthorization(), movieApi.getMovies);                    // get all movies as json array from the list
router.get('/movies/unwatched', checkAuthorization(), movieApi.getUnwatchedMovies); // get all unwatched movies as json array from the list
router.get('/movies/id', checkAuthorization(), movieApi.getMovieById);              // get a single movie by its id from send body {id: id}
router.get('/movies/random', checkAuthorization(), movieApi.getThreeRandomMovies);  // get three random movies from the list
router.post('/movies', checkAuthorization(), movieApi.addMovie);                    // add a movie with its imdb url
router.post('/movies/id', checkAuthorization(), movieApi.insertPersonalReview);     // insert personalRating into movie
router.put('/movies/toggle/id', checkAuthorization(), movieApi.watchMovie);         // watch or unwatch a movie via its ID
router.put('/movies/id', checkAuthorization(), movieApi.refreshMovie);              // refresh a movies changing data like votes and rating, but keep the personally stored values
router.delete('/movies/:id', checkAuthorization(), movieApi.deleteMovie);           // angular httpclient.delete() does not support sending a body => using path variable instead
router.post('/movies/availability', movieApi.checkAvailability) // check if the movie is available on the usual sites

module.exports = router;