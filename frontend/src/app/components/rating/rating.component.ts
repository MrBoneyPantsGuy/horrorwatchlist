import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('rating') rating = 1;
  // tslint:disable-next-line:no-input-rename
  @Input('category') category;
  // tslint:disable-next-line:no-input-rename
  @Input('icons') icons;
  // tslint:disable-next-line:no-input-rename
  @Input('tooltip') tooltip;
  @Output() ratingUpdated = new EventEmitter();

  totalStar = 10;
  ratingArray: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let index = 0; index < this.totalStar; index++) {
      this.ratingArray.push(index);
    }
  }

  calculateRating(rating: number): void {
    this.ratingUpdated.emit(rating);
  }

  iconStatus(index: number): string {
    if (this.rating >= index + 1) {
      return this.icons[0];
    } else {
      return this.icons[1];
    }
  }

}
