import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movie } from '../../models/Movie';
import {AvailabilityService} from '../../services/availability.service';
import { MovieService } from '../../services/movie.service';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  title: string;
  link: string;
  poster: string;
}

@Component({
  selector: 'app-availability-check',
  templateUrl: './availability-check.component.html',
  styleUrls: ['./availability-check.component.css']
})

export class AvailabilityCheckComponent implements OnInit {
  private availabilityservice: AvailabilityService;
  public resultsB: SearchResult[];
  public resultsS: SearchResult[];
  constructor(public dialogRef: MatDialogRef<AvailabilityCheckComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, http: HttpClient) {
    this.availabilityservice = new AvailabilityService(http);
    this.resultsB = [];
    this.resultsS = [];
  }

  ngOnInit(): void {
  }

  async checkAvailability(id): Promise<any> {
    const res = await this.availabilityservice.checkAvailability(id).toPromise().then( (success) => {
      success.body.BFLIX.forEach(element => {
        this.resultsB.push(element);
      });
      success.body.SockShare.forEach(element => {
        this.resultsS.push(element);
      });
    });
  }

}
