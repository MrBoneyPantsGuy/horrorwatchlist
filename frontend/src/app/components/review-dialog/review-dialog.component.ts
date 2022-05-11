import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Rating {
  value: number;
  category: string;
  icons: string[];
  tooltip: string;
}

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit {
  public ratings: Rating[];
  public average = 1.0;
  public reveal = false;

  constructor(public dialogRef: MatDialogRef<ReviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ratings = [
      { value: 1, category: 'Drunk-O-Meter', icons: ['local_bar', 'local_drink'], tooltip: 'How many drinks did you have already?' },
      { value: 1, category: 'Gore', icons: ['star', 'star_border'], tooltip: 'How much gore was there and how was the quality?'},
      { value: 1, category: 'Horror', icons: ['star', 'star_border'], tooltip: 'How was the horror?' },
      { value: 1, category: 'Fun', icons: ['star', 'star_border'], tooltip: 'How much fun did you have?' },
      { value: 1, category: 'Style', icons: ['star', 'star_border'], tooltip: 'Did you like the style?' },
      { value: 1, category: 'Hot', icons: ['star', 'star_border'], tooltip: 'How hot where the actresses and did you see them naked?' },
      { value: 1, category: 'Seb-Rating', icons: ['star', 'star_border'], tooltip: 'This is Sebastians personal rating for the movie.' },
      { value: 1, category: 'Valle-Rating', icons: ['star', 'star_border'], tooltip: 'This is Valentins personal rating for the movie.' }
    ];
  }

  ngOnInit(): void { }

  onRatingChanged(rating: number, index: number): void {
    this.ratings[index].value = rating;
    this.calcAverage();
  }

  calcAverage(): void {
    let calc = 0;
    for (let i = 1; i < 6; i++) {
      calc += this.ratings[i].value;
    }
    this.average = calc / 5;
  }

  save(): any {
    const date = new Date();
    this.data.personalRating = {
      reviewedWhen: date.toLocaleString('de-DE'),
      config: this.ratings
    };
    this.dialogRef.close(this.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  toggleReveal(): void {
    this.reveal = !this.reveal;
  }
}


