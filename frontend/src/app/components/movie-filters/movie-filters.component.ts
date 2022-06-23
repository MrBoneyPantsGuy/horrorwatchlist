import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-filters',
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.css']
})
export class MovieFiltersComponent implements OnInit {
  minRating = 1;
  amount = 1;

  constructor() { }

  ngOnInit(): void {
  }

  updateMinRating(value): void {
    this.minRating = value;
  }

  updateAmount(value): void {
    this.amount = value;
  }

}
