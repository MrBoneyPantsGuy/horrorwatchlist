import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  client: HttpClient;
  guard: AuthGuardService;

  constructor(http: HttpClient) { this.client = http; }

  checkAvailability(id, site): Observable<HttpResponse<any>> {
    return this.client.post('/api/movies/availability', {id: id, site: site}, {observe: 'response'});
  }
}
