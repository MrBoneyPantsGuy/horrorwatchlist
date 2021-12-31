import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {Movie} from "../../models/Movie";
import {HttpClient} from "@angular/common/http";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-list-overview-page',
  templateUrl: './list-overview-page.component.html',
  styleUrls: ['./list-overview-page.component.css']
})
export class ListOverviewPageComponent implements OnInit {
  movieservice: MovieService;
  displayWatched: boolean = false;
  allMovies: Movie[];
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();
  columnsToDisplay = ['position', 'title', 'year', 'director', 'runtime', 'rating', 'votes', 'poster', 'action'];

  @ViewChild(MatTable) table: MatTable<Movie>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(http:HttpClient) {
    this.movieservice = new MovieService(http);
  }

  async ngOnInit() {
    await this.movieservice.getAllMovies().subscribe(movies => this.dataSource.data = movies);
    this.dataSource.sort = this.sort;
  }

  async ngAfterViewInit() {

  }

  public async refresh(id) {
    await this.movieservice.refreshMovie(id).toPromise().then(res => res.body).then(movie => {
      const tmpMovie = new Movie(movie.id, movie.title, movie.year, movie.runtime, movie.director, movie.rating, movie.imdbLink, movie.posterLink, movie.watched, movie.personalRating, movie.votes, movie.genre, movie.plot, movie.actors);
      let index = this.dataSource.data.findIndex(item => item.id === tmpMovie.id);
      this.dataSource.data[index] = tmpMovie;
      this.dataSource = new MatTableDataSource<Movie>(this.dataSource.data);
    });
  }

  public async delete(id) {
    let index = this.dataSource.data.findIndex(movie => movie.id === id);
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource<Movie>(this.dataSource.data);
    await this.movieservice.deleteMovie(id);
  }

  async toggleDisplay() {
    this.displayWatched = !this.displayWatched;
  }
}
