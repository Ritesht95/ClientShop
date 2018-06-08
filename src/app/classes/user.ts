import { map } from 'rxjs/internal/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  private UserID: string;
  private Name: string;
  private Gender: string;
  private Email: string;
  private PhoneNo: string;
  private Password: string;
  private ProfileImage: string;
  private CreatedOn: string;
  private IsActive: boolean;
  private VerificationCode: string;

  constructor(private http: Http) {}

  /* Getter and Setters */
  /**
   * Getter $UserID
   * @return {string}
   */
  public get $UserID(): string {
    return this.UserID;
  }

  /**
   * Getter $Name
   * @return {string}
   */
  public get $Name(): string {
    return this.Name;
  }

  /**
   * Getter $Gender
   * @return {string}
   */
  public get $Gender(): string {
    return this.Gender;
  }

  /**
   * Getter $Email
   * @return {string}
   */
  public get $Email(): string {
    return this.Email;
  }

  /**
   * Getter $PhoneNo
   * @return {string}
   */
  public get $PhoneNo(): string {
    return this.PhoneNo;
  }

  /**
   * Getter $Password
   * @return {string}
   */
  public get $Password(): string {
    return this.Password;
  }

  /**
   * Getter $ProfileImage
   * @return {string}
   */
  public get $ProfileImage(): string {
    return this.ProfileImage;
  }

  /**
   * Getter $CreatedOn
   * @return {string}
   */
  public get $CreatedOn(): string {
    return this.CreatedOn;
  }

  /**
   * Getter $IsActive
   * @return {boolean}
   */
  public get $IsActive(): boolean {
    return this.IsActive;
  }

  /**
   * Getter $VerificationCode
   * @return {string}
   */
  public get $VerificationCode(): string {
    return this.VerificationCode;
  }

  /**
   * Setter $UserID
   * @param {string} value
   */
  public set $UserID(value: string) {
    this.UserID = value;
  }

  /**
   * Setter $Name
   * @param {string} value
   */
  public set $Name(value: string) {
    this.Name = value;
  }

  /**
   * Setter $Gender
   * @param {string} value
   */
  public set $Gender(value: string) {
    this.Gender = value;
  }

  /**
   * Setter $Email
   * @param {string} value
   */
  public set $Email(value: string) {
    this.Email = value;
  }

  /**
   * Setter $PhoneNo
   * @param {string} value
   */
  public set $PhoneNo(value: string) {
    this.PhoneNo = value;
  }

  /**
   * Setter $Password
   * @param {string} value
   */
  public set $Password(value: string) {
    this.Password = value;
  }

  /**
   * Setter $ProfileImage
   * @param {string} value
   */
  public set $ProfileImage(value: string) {
    this.ProfileImage = value;
  }

  /**
   * Setter $CreatedOn
   * @param {string} value
   */
  public set $CreatedOn(value: string) {
    this.CreatedOn = value;
  }

  /**
   * Setter $IsActive
   * @param {boolean} value
   */
  public set $IsActive(value: boolean) {
    this.IsActive = value;
  }

  /**
   * Setter $VerificationCode
   * @param {string} value
   */
  public set $VerificationCode(value: string) {
    this.VerificationCode = value;
  }

  /* Getter and Setters */

  /* Methods */
  CheckLogin(Username: string, Password: string): any {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      username: Username,
      password: Password
    };

    return this.http
      .post(environment.apiURL + 'User/CheckLogin.php', data, options)
      .pipe(map(res => res.json()));
  }

  signUp(
    Name: string,
    Gender: string,
    Email: string,
    Password: string,
    PhoneNo: string
  ): any {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      Name: Name,
      Gender: Gender,
      Email: Email,
      Password: Password,
      PhoneNo: PhoneNo
    };

    return this.http
      .post(environment.apiURL + 'User/UserSignup.php', data, options)
      .pipe(map(res => res.json()));
  }

  forgotPassword(Username: string): any {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      username: Username
    };

    return this.http
      .post(environment.apiURL + 'User/ForgetPassword.php', data, options)
      .pipe(map(res => res.json()));
  }

  checkRandomString(RandomString: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = { rand: RandomString };

    return (
      this.http
        .post(environment.apiURL + 'User/CheckRandomString.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  resetPassword(
    Username: string,
    VerificationCode: string,
    NewPassword: string
  ) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      username: Username,
      verificationcode: VerificationCode,
      newpassword: NewPassword
    };

    return (
      this.http
        .post(environment.apiURL + 'User/ResetPassword.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  changePassword(
    OldPassword: string,
    NewPassword: string,
    UserID: string
  ): any {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      oldpassword: OldPassword,
      newpassword: NewPassword,
      ID: UserID
    };

    return (
      this.http
        .post(environment.apiURL + 'User/ChangePassword.php', data, options)
        // tslint:disable-next-line:no-shadowed-variable
        .pipe(map(res => res.json()))
    );
  }

  getUserData(UserID: string) {
    return this.http
      .get(environment.apiURL + 'User/UserData.php?id=' + UserID)
      .pipe(map(res => res.json()));
  }

  getUserAddresses(UserID: string) {
    return this.http
      .get(environment.apiURL + 'User/ViewAllAddress.php?id=' + UserID)
      .pipe(map(res => res.json()));
  }

  setUserImage(formData: FormData) {
    console.log('startserve');
    const endpoint = environment.apiURL + 'User/ProfileImageUpdate.php';
    return this.http.post(endpoint, formData).pipe(
      map(
        res => res.json(),
        error => {
          console.log(error);
        }
      )
    );
  }
  /* Methods */
}
