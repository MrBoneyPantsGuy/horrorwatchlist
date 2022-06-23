import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AuthGuardService} from './auth-guard.service';
import {Observable} from 'rxjs';
import {Movie} from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  client: HttpClient;
  guard: AuthGuardService;

  constructor(http: HttpClient) { this.client = http; }

  // tslint:disable-next-line:max-line-length
  getAllMovies(): Observable<Movie[]>{ // fetches all Movies on the list from the backend, interprets the result as Movie[] and returns it as an observable
    return this.client.get<Movie[]>('/api/movies');
  }

  getAllUnwatchedMovies(): Observable<HttpResponse<Movie[]>> {
    return this.client.get<Movie[]>('/api/movies/unwatched', {observe: 'response'});
}

  getRandomMovies(): Observable<HttpResponse<Movie[]>> {
    return this.client.get<Movie[]>('/api/movies/random', {observe: 'response'});
  }

  addMovie(url): Observable<HttpResponse<any>> {
    return this.client.post('/api/movies', {url: url}, {observe: 'response', responseType: 'text'} );
  }

  refreshMovie(id): Observable<HttpResponse<Movie>> {
    return this.client.put<Movie>('/api/movies/id', {id: id}, {observe: 'response'});
  }

  deleteMovie(id): Observable<Movie> {
    return this.client.delete<Movie>(`/api/movies/${id}`);
  }

  toggleMovie(id): Observable<HttpResponse<Movie>> {
    return this.client.put<Movie>('/api/movies/toggle/id', {id: id}, {observe: 'response'});
  }

  insertMovieReview(movie: Movie): Observable<Movie> {
    return this.client.post<Movie>('/api/movies/id', {id: movie.id, personalRating: movie.personalRating});
  }
}
