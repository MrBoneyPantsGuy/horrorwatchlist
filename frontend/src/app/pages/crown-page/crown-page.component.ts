import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-crown-page',
  templateUrl: './crown-page.component.html',
  styleUrls: ['./crown-page.component.css']
})
export class CrownPageComponent implements OnInit {
  userService: UserService;
  users: User[];

  constructor(http: HttpClient) {
    this.userService = new UserService(http);
  }

  async ngOnInit(): Promise<any> {
    await this.userService.getAllUsers().subscribe(users => this.users = users, (error) => console.log(error), () => {
      console.log('All users fetched');
    });
  }

}
