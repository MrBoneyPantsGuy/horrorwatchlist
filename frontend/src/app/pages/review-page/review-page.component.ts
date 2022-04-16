import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../../models/Movie';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {
  movieservice: MovieService;
  allMovies: Movie[];

  constructor(http: HttpClient) {
    this.movieservice = new MovieService(http);
  }

  async ngOnInit(): Promise<any> {
    this.movieservice.getAllMovies().subscribe(movies => this.allMovies = movies, (error) => console.log(error), () => {
      this.allMovies = this.allMovies.filter( movie => movie.watched === true);
      console.log(this.allMovies);
    });
  }

}
