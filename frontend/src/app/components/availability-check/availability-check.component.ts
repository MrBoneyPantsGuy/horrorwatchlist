import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AvailabilityService} from '../../services/availability.service';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  title: string;
  link: string;
  poster: string;
  similarity: number;
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
  public loadingB = false;
  public loadingS = false;

  constructor(public dialogRef: MatDialogRef<AvailabilityCheckComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, http: HttpClient) {
    this.availabilityservice = new AvailabilityService(http);
    this.resultsB = [];
    this.resultsS = [];
  }

  ngOnInit(): void {
  }

  async checkAvailability(id): Promise<any> {
    this.loadingB = true;
    const resB = await this.availabilityservice.checkAvailability(id, 'BFLIX').toPromise().then( (success) => {
      success.body.data.forEach(element => {
        this.resultsB.push(element);
      });
      this.loadingB = false;
    });
    this.loadingS = true;
    const resS = await this.availabilityservice.checkAvailability(id, 'SockShare').toPromise().then( (success) => {
      success.body.data.forEach(element => {
        this.resultsS.push(element);
      });
      this.loadingS = false;
    }, (fail) => {
      this.loadingS = false;
    });
  }

}
