import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log((5.5 + 4.5 + 5.0 + 5.0 + 3.5) / 5.0);
    console.log((3.0 + 3.0 + 4.0 + 3.5 + 4.0) / 5.0);
  }

}
