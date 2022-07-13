import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NamedCrown } from '../models/NamedCrown';

/**
 * handles backend communication regarding user accounts
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * retrieves userdata of currently authenticated user
   */
  getOwnUser(): Observable<User>{
    return this.http.get<User>('/api/user');
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  getAllNamedCrownsfromUser(userID): Observable<NamedCrown[]> {
    return this.http.post<NamedCrown[]>('/api/user/get/namedcrowns', {userID});
  }

  incrementCrowns(userID, amount): Observable<HttpResponse<any>> {
    return this.http.post('/api/user/crowns', {_id: userID, amount}, {observe: 'response'});
  }

  postNamedCrown(crown): Observable<any> {
    return this.http.post('/api/user/post/namedcrowns', {crown});
  }

}
