class MovieState {
    constructor(addedWhen, watched, watchedWhen, personalRating) {
        this.addedWhen = addedWhen;
        this.watched = watched;
        this.watchedWhen = watchedWhen;
        this.personalRating = personalRating;
    }
}

module.exports = MovieState;