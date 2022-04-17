import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../../models/Movie';
import {MatDialog} from '@angular/material/dialog';
import {ReviewDialogComponent} from '../../components/review-dialog/review-dialog.component';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {
  movieservice: MovieService;
  allMovies: Movie[];
  breakpoint: number;

  constructor(http: HttpClient, public dialog: MatDialog) {
    this.movieservice = new MovieService(http);
  }

  async ngOnInit(): Promise<any> {
    this.breakpoint = (window.innerWidth <= 1800) ? (window.innerWidth <= 1500) ? 3 : 4 : 5;
    this.movieservice.getAllMovies().subscribe(movies => this.allMovies = movies, (error) => console.log(error), () => {
      this.allMovies = this.allMovies.filter( movie => movie.watched === true && movie.personalRating);
    });
  }

  onResize(event): void {
    this.breakpoint = (event.target.innerWidth <= 1800) ? (event.target.innerWidth <= 1500) ? 3 : 4 : 5;
  }

  openDialog(movie: Movie): void {
   const dialogRef = this.dialog.open(ReviewDialogComponent, {
     width: '500px',
     data: movie
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result) {
       console.log(result);
     }
   });
  }
}
