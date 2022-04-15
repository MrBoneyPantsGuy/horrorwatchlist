import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/Movie';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';

@Component({
  selector: 'app-random-selection-page',
  templateUrl: './random-selection-page.component.html',
  styleUrls: ['./random-selection-page.component.css']
})
export class RandomSelectionPageComponent implements OnInit {
  movieservice: MovieService;
  movies: Movie[] = [];
  watched: boolean[] = [false, false, false];

  constructor(http:HttpClient, private _clipboardService: ClipboardService) {
    this.movieservice = new MovieService(http);
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    // tslint:disable-next-line:max-line-length
    await this.movieservice.getRandomMovies().toPromise().then(res => res.body).then(movies => movies.forEach(movie => this.movies.push(new Movie(movie.id, movie.title, movie.year, movie.runtime, movie.director, movie.rating, movie.imdbLink, movie.posterLink, movie.watched, movie.personalRating, movie.votes, movie.genre, movie.plot, movie.actors))));
  }

  copy(text: string): void {
    this._clipboardService.copy(text);
  }

  async setWatched(id): Promise<any> {
    const index = this.movies.findIndex(movie => movie.id === id);
    // wait for fancy button-click animation to finish
    setTimeout( () => {
      this.watched[index] = true;
    }, 300);
    console.log('Implement watched...');
  }

  async unwatch(id): Promise<any> {
    const index = this.movies.findIndex(movie => movie.id === id);
    // wait for fancy button-click animation to finish
    setTimeout( () => {
      this.watched[index] = false;
    }, 300);
    console.log('Implement unwatch...');
  }
}
