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
  movies: Movie[] = [];
  dataSource: MatTableDataSource<Movie>; //TODO: make dataSource observable
  columnsToDisplay = ['position', 'title', 'year', 'director', 'runtime', 'rating', 'votes', 'poster', 'action'];

  @ViewChild(MatTable) table: MatTable<Movie>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(http:HttpClient) {
    this.movieservice = new MovieService(http);
  }

  async ngOnInit() {}

  async ngAfterViewInit() {
    await this.movieservice.getAllMovies().toPromise().then(res => res.body).then(movies => movies.forEach(movie => this.movies.push(new Movie(movie.id, movie.title, movie.year, movie.runtime, movie.director, movie.rating, movie.imdbLink, movie.posterLink, movie.watched, movie.personalRating, movie.votes, movie.genre, movie.plot, movie.actors))));
    this.dataSource = new MatTableDataSource<Movie>(this.movies);
    this.dataSource.sort = this.sort;
    //this.table.renderRows();
  }

  public async refresh(id) {
    await this.movieservice.refreshMovie(id).toPromise().then(res => res.body).then(movie => {
      // component doesnt care so far about updating the content without page refresh, so next 5 lines are basically useless right now
      const tmpMovie = new Movie(movie.id, movie.title, movie.year, movie.runtime, movie.director, movie.rating, movie.imdbLink, movie.posterLink, movie.watched, movie.personalRating, movie.votes, movie.genre, movie.plot, movie.actors);
      let index = this.movies.findIndex(item => item.id === tmpMovie.id);
      this.movies[index] = tmpMovie;
      this.dataSource[index] = tmpMovie;
      this.table.renderRows();
      location.reload();
    });
  }

  public async delete(id) {
    await this.movieservice.deleteMovie(id).toPromise().then(() => {
      location.reload()
    });
  }

  async toggleDisplay() {
    this.displayWatched = !this.displayWatched;
    this.dataSource.data = this.dataSource.data.filter(row => this.displayWatched ? row.watched === true || row.watched === false : row.watched === false);
  }
}
