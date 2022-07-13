import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stacked-crowns',
  templateUrl: './stacked-crowns.component.html',
  styleUrls: ['./stacked-crowns.component.css']
})
export class StackedCrownsComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('crowns') numberOfCrowns;
  // tslint:disable-next-line:no-input-rename
  @Input('namedCrowns') namedCrowns;
  helperArray: number[];
  constructor() {
  }

  ngOnInit(): void {
  }

}
