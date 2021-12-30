import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {MovieService} from "../../services/movie.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {
  movieservice: MovieService;
  imdbLink: string;
  error: string;

  constructor(http:HttpClient) {
    this.movieservice = new MovieService(http);
  }

  ngOnInit(): void {

  }

  async addMovie() {
    await this.movieservice.addMovie(this.imdbLink).toPromise().then(res => res.body).then(text => {
      this.error = text;
    });
  }
}
