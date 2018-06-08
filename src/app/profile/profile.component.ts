import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { SessionService } from '../services/session.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData = {};
  env = environment.apiURL;

  constructor(private objUser: User, private sessionservice: SessionService) { }

  ngOnInit() {
    this.objUser.getUserData(this.sessionservice.getUserID()).subscribe(
      res => {
        this.userData = res;
      }
    );
  }

}
