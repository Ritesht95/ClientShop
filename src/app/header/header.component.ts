import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Session } from 'protractor';
import { SessionService } from '../services/session.service';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  errorMessage = null;
  successMessage = null;
  loggedIn = false;
  webInfo: any = '';
  var1: any = '';
  var2: any = '';
  var3: any = '';

  constructor(private userObj: User, private sessionservice: SessionService, private router: Router, private services: ServicesService) {}

  ngOnInit() {
    this.loggedIn = this.sessionservice.getUserLoggedIn();

    this.services.getWebInfo().subscribe(res => {
      if (res['key'] === 'false') {
        this.webInfo = res;

        console.log( this.webInfo);
      } else {
        this.webInfo = res;
        this.var1 = this.webInfo.Name.split(' ');
        this.var3 = this.var1[0];
        this.var2 = this.var1[1];
        console.log( this.webInfo);
        document
          .getElementById('profileImageIn')
          .setAttribute(
            'src',
            environment.apiURL + 'Assets/WebsiteLogo/' + this.webInfo.Logo
          );
        document
          .getElementById('profileImageIn')
          .setAttribute('alt', this.webInfo.LogoAlt);
      }
    });

  }

  timeout(val: boolean, element: string) {
    setTimeout(this.ShowAlert, 5000, val, element);
  }

  ShowAlert(val: boolean, element: string) {
    const alertDiv = document.getElementById(element);
    alertDiv.style.display = val ? 'block' : 'none';
    if (!val) {
      this.errorMessage = null;
      this.successMessage = null;
    }
  }

  closeSidebar() {
    document.getElementById('btnSidebarClose').click();
  }

  closeLoginModal() {
    document.getElementById('btnCloseLogin').click();
  }

  checkLogin(Username: string, Password) {
    this.userObj.CheckLogin(Username, Password).subscribe(res => {
      if (res['key'] === 'false') {
        this.errorMessage = 'Wrong Credentials!';
        this.ShowAlert(true, 'alertDivLogin');
        this.timeout(false, 'alertDivLogin');
      } else {
        this.closeLoginModal();
        this.sessionservice.setUserLoggedIn(res['UserID'], res['Email'], res['PhoneNO'], res['Name']);
        this.loggedIn = this.sessionservice.getUserLoggedIn();
        this.router.navigate(['profile']);
      }
    });
  }

  forgotPassword(Username: string) {
    this.userObj.forgotPassword(Username).subscribe(
      res => {
        if (res['key'] === 'false') {
          this.errorMessage = 'Something went wrong!';
          this.ShowAlert(true, 'alertDivFP');
          this.timeout(false, 'alertDivFP');
        } else if (res['key'] === 'nexist') {
          this.errorMessage = 'This Email or Phone no is not registered with us!';
          this.ShowAlert(true, 'alertDivFP');
          this.timeout(false, 'alertDivFP');
        } else {
          this.successMessage = 'Reset link and Verification Code has been sent to your mail.';
          this.ShowAlert(true, 'alertDivFPS');
          this.timeout(false, 'alertDivFPS');
        }
      }
    );
  }

  changePassword(NewPassword: string, OldPassword: string) {
    this.userObj.changePassword(OldPassword, NewPassword, '1').subscribe(
      res => {
        if (res['key'] === 'incorrect') {
          // Wrong old Password
          this.errorMessage = 'Wrong old Password';
          this.ShowAlert(true, 'alertDivCP');
          this.timeout(false, 'alertDivCP');
        } else if (res['key'] === 'same') {
          // Same as Current Password
          this.errorMessage = 'Same as Current Password';
          this.ShowAlert(true, 'alertDivCP');
          this.timeout(false, 'alertDivCP');
        } else if (res['key'] === 'oldsame') {
          // Same as Previous Password
          this.errorMessage = 'Same as Previous Password';
          this.ShowAlert(true, 'alertDivCP');
          this.timeout(false, 'alertDivCP');
        } else if (res['key'] === 'false') {
          // Server Error
          this.errorMessage = 'Server Error';
          this.ShowAlert(true, 'alertDivCP');
          this.timeout(false, 'alertDivCP');
        } else {
          this.successMessage = 'Password changed succesfully';
          this.ShowAlert(true, 'alertDivCPS');
          this.timeout(false, 'alertDivCPS');
        }
      }
    );
  }

  signUp(
    Name: string,
    Gender: string,
    Email: string,
    Password: string,
    PhoneNo: string
  ) {
    this.userObj
      .signUp(Name, Gender, Email, Password, PhoneNo)
      .subscribe(res => {
        if (res['key'] === 'true') {
          this.successMessage =
            'Confirmation link has been sent to you by email.';
          this.ShowAlert(true, 'alertDivRegS');
          this.timeout(false, 'alertDivRegS');
          (<HTMLInputElement>document.getElementById('txtName')).value = '';
          (<HTMLInputElement>document.getElementById('txtEmail')).value = '';
          (<HTMLInputElement>document.getElementById('txtPassword1')).value = '';
          (<HTMLInputElement>document.getElementById('gender')).value = '';
          (<HTMLInputElement>document.getElementById('txtContact')).value = '';
        } else {
          this.errorMessage = 'Something went wrong! Try again later.';
          this.ShowAlert(true, 'alertDivReg');
          this.timeout(false, 'alertDivReg');
        }
      });
  }
}
