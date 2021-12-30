/**
 * this model specifies the format to exchange credentials with the backend
 */
export class Movie{
  constructor(
    public id: string,
    public title: string,
    public year: string,
    public runtime: string,
    public director: string,
    public rating: string,
    public imdbLink: string,
    public posterLink: string,
    public watched: boolean,
    public personalRating: object,
    public votes: string,
    public genre: string,
    public plot: string,
    public actors: string
  ) {  }
}
