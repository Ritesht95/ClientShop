import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userID = '';
  userData = '';
  userGender = '';

  constructor(private actRoute: ActivatedRoute, private userObj: User, private router: Router) {}

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.userID = params['id'];
    });
    this.userObj.getUserData(this.userID).subscribe(res => {
      this.userData = res;
      this.userGender = res['Gender'];
    });
  }

  updateProfile(Name: string, PhoneNo: string, Email: string) {
    this.userObj
      .updateProfile(Name, PhoneNo, Email, this.userGender, this.userID)
      .subscribe(res => {
        this.userData = res;
        this.router.navigate(['profile']);
      });
  }
}
