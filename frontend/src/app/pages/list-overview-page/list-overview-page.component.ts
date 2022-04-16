import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/Movie';
import {HttpClient} from '@angular/common/http';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-list-overview-page',
  templateUrl: './list-overview-page.component.html',
  styleUrls: ['./list-overview-page.component.css']
})
export class ListOverviewPageComponent implements OnInit, AfterViewInit {
  movieservice: MovieService;
  displayWatched = false;
  refreshing: boolean[];
  allMovies: Movie[];
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();
  columnsToDisplay = ['position', 'title', 'year', 'director', 'runtime', 'rating', 'votes', 'poster', 'action'];

  @ViewChild(MatTable) table: MatTable<Movie>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(http: HttpClient) {
    this.movieservice = new MovieService(http);
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    await this.movieservice.getAllMovies().subscribe(movies => this.dataSource.data = movies, (error) => console.log(error), () => {
      this.refreshing = new Array(this.dataSource.data.length).fill(false);
      this.dataSource.sort = this.sort;
    });
  }

  // tslint:disable-next-line:typedef
  async ngAfterViewInit() {
    console.log('AfterViewInit');
  }

  public async refresh(id, row): Promise<any> {
    this.refreshing[row] = true;
    await this.movieservice.refreshMovie(id).toPromise().then(res => res.body).then(movie => {
      // tslint:disable-next-line:max-line-length
      const tmpMovie = new Movie(movie.id, movie.title, movie.year, movie.runtime, movie.director, movie.rating, movie.imdbLink, movie.posterLink, movie.watched, movie.personalRating, movie.votes, movie.genre, movie.plot, movie.actors);
      const index = this.dataSource.data.findIndex(item => item.id === tmpMovie.id);
      this.dataSource.data[index] = tmpMovie;
      this.dataSource = new MatTableDataSource<Movie>(this.dataSource.data);
      this.dataSource.sort = this.sort;
    });

    setTimeout( () => {
      this.refreshing[row] = false;
    }, 500);
  }

  public async delete(id): Promise<any> {
    const index = this.dataSource.data.findIndex(movie => movie.id === id);
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource<Movie>(this.dataSource.data);
    await this.movieservice.deleteMovie(id).toPromise();
  }

  public async toggle(id): Promise<any> {
    const index = this.dataSource.data.findIndex((movie => movie.id === id));
    this.dataSource.data[index].watched = !this.dataSource.data[index].watched;
    await this.movieservice.toggleMovie(id).toPromise();
  }

  toggleDisplay(): void {
    this.displayWatched = !this.displayWatched;
  }
}
