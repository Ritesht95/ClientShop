import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private IsUserLoggedIn = JSON.parse(
    localStorage.getItem('CloggedIn' || 'false')
  );

  private UserID;
  private Email;
  private Name;
  private PhoneNo;

  constructor() {
    if (this.getUserLoggedIn() === 'true') {
      this.setFromLocalStorage();
    }
  }

  getUserLoggedIn() {
    this.IsUserLoggedIn = localStorage.getItem('CloggedIn');
    return this.IsUserLoggedIn;
  }

  setUserLoggedIn(
    UserID: number,
    Email: string,
    PhoneNo: string,
    Name: string
  ) {
    localStorage.setItem('CloggedIn', 'true');
    this.IsUserLoggedIn = 'true';
    this.setValues(UserID, Email, PhoneNo, Name);
  }

  setValues(UserID: number, Email: string, PhoneNo: string, Name: string) {
    this.UserID = UserID;
    this.Name = Name;
    this.Email = Email;
    this.PhoneNo = PhoneNo;
    localStorage.setItem('sessionCUserID', this.UserID);
    localStorage.setItem('sessionCName', this.Name);
    localStorage.setItem('sessionCEmail', this.Email);
    localStorage.setItem('sessionCPhone', this.PhoneNo);
  }

  setFromLocalStorage() {
    this.UserID = localStorage.getItem('sessionCUserID');
    this.Name = localStorage.getItem('sessionCName');
    this.UserID = localStorage.getItem('sessionCEmail');
    this.UserID = localStorage.getItem('sessionCPhone');
  }

  getUserID() {
    this.UserID = localStorage.getItem('sessionCUserID');
    return this.UserID;
  }

  getName() {
    this.Name = localStorage.getItem('sessionCName');
    return this.Name;
  }

  getEmail() {
    this.UserID = localStorage.getItem('sessionCEmail');
    return this.UserID;
  }

  getPhoneNo() {
    this.UserID = localStorage.getItem('sessionCPhone');
    return this.UserID;
  }

  logoutUser() {
    localStorage.removeItem('sessionCUserID');
    localStorage.removeItem('sessionCName');
    localStorage.removeItem('sessionCEmail');
    localStorage.removeItem('sessionCPhone');
    localStorage.setItem('CloggedIn', 'false');
    this.IsUserLoggedIn = 'false';
  }
}
