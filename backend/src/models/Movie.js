class Movie {
     constructor(id, title, year, director, rating, runtime, imdbLink, posterLink, watched, personalRating, votes, genre, plot, actors, movieState) {
         this.id = id;
         this.title = title;
         this.year = year;
         this.runtime = runtime;
         this.director = director;
         this.rating = rating;
         this.imdbLink = imdbLink;
         this.posterLink = posterLink;
         this.watched = watched;
         this.personalRating = personalRating;
         this.votes = votes;
         this.genre = genre;
         this.plot = plot;
         this.actors = actors;
         this.movieState = movieState;
     }
}

module.exports = Movie;