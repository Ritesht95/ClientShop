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

  timeDifference(current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return (
        'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago'
      );
    } else {
      return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

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
        // tslint:disable-next-line:no-shadowed-constiable
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
        // tslint:disable-next-line:no-shadowed-constiable
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
        // tslint:disable-next-line:no-shadowed-constiable
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

  checkEmail(Email: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      Email: Email
    };

    return this.http
      .post(environment.apiURL + 'User/CheckEmail.php', data, options)
      .pipe(map(res => res.json()));
  }

  checkPhoneNo(PhoneNo: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      PhoneNo: PhoneNo
    };

    return this.http
      .post(environment.apiURL + 'User/CheckPhoneNo.php', data, options)
      .pipe(map(res => res.json()));
  }

  getSingleAddress(ID: string) {
    return this.http
      .get(environment.apiURL + 'User/ViewSingleAddress.php?id=' + ID)
      .pipe(map(res => res.json()));
  }

  updateProfile(
    Name: string,
    PhoneNo: string,
    Email: string,
    Gender: string,
    ID: string
  ) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      Name: Name,
      Gender: Gender,
      Email: Email,
      ID: ID,
      PhoneNo: PhoneNo
    };

    return this.http
      .post(environment.apiURL + 'User/UpdateProfile.php', data, options)
      .pipe(map(res => res.json()));
  }

  addAddress(
    UserID: string,
    AddressID: string,
    Name: string,
    PhoneNo: string,
    Pincode: string,
    Locality: string,
    Address: string,
    City: string,
    State: string,
    Landmark: string,
    Country: string,
    AddressType: string
  ) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      UserID: UserID,
      AddressID: AddressID,
      Name: Name,
      PhoneNo: PhoneNo,
      Pincode: Pincode,
      Locality: Locality,
      Address: Address,
      City: City,
      State: State,
      Landmark: Landmark,
      Country: Country,
      AddressType: AddressType
    };

    return this.http
      .post(environment.apiURL + 'User/AddAddress.php', data, options)
      .pipe(map(res => res.json()));
  }

  removeUserImage(UserID: string) {
    return this.http
      .get(environment.apiURL + 'User/RemoveImage.php?id=' + UserID)
      .pipe(map(res => res.json()));
  }

  getUserCart(UserID: string) {
    return this.http
      .get(environment.apiURL + 'Cart/DisplayCart.php?id=' + UserID)
      .pipe(map(res => res.json()));
  }

  getUserOrders(UserID: string) {
    return this.http
      .get(environment.apiURL + 'Order/GetUserOrders.php?id=' + UserID)
      .pipe(map(res => res.json()));
  }
  /* Methods */
}
