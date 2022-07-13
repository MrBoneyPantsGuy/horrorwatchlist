import { Component, Input, OnInit } from '@angular/core';
import { NamedCrown } from '../../models/NamedCrown';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-crowns-display',
  templateUrl: './user-crowns-display.component.html',
  styleUrls: ['./user-crowns-display.component.css']
})
export class UserCrownsDisplayComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('user') user: User;
  namedCrowns: NamedCrown[];
  userService: UserService;
  helperArray: number[];
  constructor(http: HttpClient) {
    this.userService = new UserService(http);
  }

  async ngOnInit(): Promise<any> {
    await this.userService.getAllNamedCrownsfromUser(this.user._id).subscribe(crowns => this.namedCrowns = crowns,
      (error) => console.log(error),
      () => {
        this.user.crowns += this.namedCrowns.length;
        this.helperArray = Array(this.user.crowns).fill(0).map((x, i) => i);
      });
  }

  capitalize = (s) => {
    if (typeof s !== 'string') { return ''; }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  async increment(amount): Promise<any> {
    await this.userService.incrementCrowns(this.user._id, amount).toPromise().then(
      (success) => {
        this.user.crowns = this.user.crowns + amount;
        if (amount > 0) {
          this.helperArray.push(0);
          this.playSound('../../assets/sounds/pop.mp3');
        } else {
          this.helperArray.pop();
          this.playSound('../../assets/sounds/electric-pop.wav');
        }
      }, (err) => {
        console.log(err);
      }
    );
  }

  async createCrown(crown): Promise<any> {
    await this.userService.postNamedCrown(crown).toPromise().then();
  }

  playSound(soundpath): void {
    const audio = new Audio();
    audio.src = soundpath;
    audio.load();
    audio.play();
  }
}
