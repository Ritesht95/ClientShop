import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  errorMessage = null;
  successMessage = null;

  constructor(private userObj: User) {}

  ngOnInit() {}

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
      }
    });
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
        if (res['key'] === true) {
          this.successMessage =
            'Confirmation link has been sent to you by email.';
          this.ShowAlert(true, 'alertDivRegS');
          this.timeout(false, 'alertDivRegS');
        } else {
          this.errorMessage = 'Something went wrong! Try again later.';
          this.ShowAlert(true, 'alertDivReg');
          this.timeout(false, 'alertDivReg');
        }
      });
  }
}
