import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userObj: User) {

  }

  checkLogin() {
    this.userObj.CheckLogin('riteshdlab@gmail.com', '1223').subscribe(
      res => {
        console.log(res);
      }
    );
  }

  signUp() {
    this.userObj.signUp('Ritesh', 'M', 'riteshdlab@gmail.com', '123', '8866699878').subscribe(
      res => {
        console.log(res);
      }
    );
  }

  ngOnInit() {
  }

}
