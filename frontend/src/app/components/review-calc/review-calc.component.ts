import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-calc',
  templateUrl: './review-calc.component.html',
  styleUrls: ['./review-calc.component.css']
})
export class ReviewCalcComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('config') config;
  totalRating = 0;
  calcRating: number;

  constructor() { }


  ngOnInit(): void {
    for ( let i = 1; i < 6; i++) {
      this.totalRating += this.config[i].value;
    }
    this.calcRating = this.totalRating / 5;
  }

}
