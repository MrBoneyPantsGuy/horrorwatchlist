import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AuthGuardService} from "./auth-guard.service";
import {Observable} from "rxjs";
import {Movie} from "../models/Movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  client: HttpClient;
  guard: AuthGuardService;

  constructor(http:HttpClient) {this.client=http;}

  getAllMovies():Observable<Movie[]>{ // fetches all Movies on the list from the backend, interprets the result as Movie[] and returns it as an observable
    return this.client.get<Movie[]>('/api/movies');
  }

  getAllUnwatchedMovies():Observable<HttpResponse<Movie[]>> {
    return this.client.get<Movie[]>('/api/movies/unwatched', {observe: "response"});
}

  getRandomMovies():Observable<HttpResponse<Movie[]>> {
    return this.client.get<Movie[]>('/api/movies/random', {observe: 'response'});
  }

  addMovie(url):Observable<HttpResponse<any>> {
    return this.client.post('/api/movies', {url: url}, {observe: 'response', responseType: 'text'} );
  }

  refreshMovie(id):Observable<HttpResponse<Movie>> {
    return this.client.put<Movie>('/api/movies/id', {id: id}, {observe: 'response'});
  }

  deleteMovie(id):Observable<HttpResponse<any>> {
    return this.client.delete(`/api/movies/${id}`, {observe: "response", responseType: 'text'});
  }
}
