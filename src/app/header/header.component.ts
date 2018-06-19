import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Session } from 'protractor';
import { SessionService } from '../services/session.service';
import { ServicesService } from '../services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Product } from '../classes/product';
import { ProductsearchComponent } from '../productsearch/productsearch.component';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  errorMessage = null;
  successMessage = null;
  loggedIn = 'false';
  webInfo: any = '';
  var1: any = '';
  var2: any = '';
  var3: any = '';
  flagEmail = false;
  flagPhoneNo = false;
  cartData = '';
  location: Location;

  constructor(
    private userObj: User,
    private sessionservice: SessionService,
    private router: Router,
    private services: ServicesService,
    private productObj: Product,
    private actRoute: ActivatedRoute,
  ) {
    this.loadScripts();
  }

  ngOnInit() {
    this.loggedIn = this.sessionservice.getUserLoggedIn();

    this.services.getWebInfo().subscribe(res => {
      if (res['key'] === 'false') {
        this.webInfo = res;

        console.log(this.webInfo);
      } else {
        this.webInfo = res;
        this.var1 = this.webInfo.Name.split(' ');
        this.var3 = this.var1[0];
        this.var2 = this.var1[1];
      }
    });

    this.userObj.getUserCart(this.sessionservice.getUserID()).subscribe(res => {
      this.cartData = res['records'];
    });
    this.loadScripts();
  }

  loadScripts() {
    const dynamicScripts = [
      '../../assets/js/demo1.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
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
        this.sessionservice.setUserLoggedIn(
          res['UserID'],
          res['Email'],
          res['PhoneNO'],
          res['Name']
        );
        this.loggedIn = this.sessionservice.getUserLoggedIn();
        this.router.navigate(['profile']);
      }
    });
  }

  forgotPassword(Username: string) {
    this.userObj.forgotPassword(Username).subscribe(res => {
      if (res['key'] === 'false') {
        this.errorMessage = 'Something went wrong!';
        this.ShowAlert(true, 'alertDivFP');
        this.timeout(false, 'alertDivFP');
      } else if (res['key'] === 'nexist') {
        this.errorMessage = 'This Email or Phone no is not registered with us!';
        this.ShowAlert(true, 'alertDivFP');
        this.timeout(false, 'alertDivFP');
      } else {
        this.successMessage =
          'Reset link and Verification Code has been sent to your mail.';
        this.ShowAlert(true, 'alertDivFPS');
        this.timeout(false, 'alertDivFPS');
      }
    });
  }

  changePassword(NewPassword: string, OldPassword: string) {
    this.userObj
      .changePassword(OldPassword, NewPassword, '1')
      .subscribe(res => {
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
        if (res['key'] === 'true') {
          this.successMessage =
            'Confirmation link has been sent to you by email.';
          this.ShowAlert(true, 'alertDivRegS');
          this.timeout(false, 'alertDivRegS');
          (<HTMLInputElement>document.getElementById('txtName')).value = '';
          (<HTMLInputElement>document.getElementById('txtEmail')).value = '';
          (<HTMLInputElement>document.getElementById('txtPassword1')).value =
            '';
          (<HTMLInputElement>document.getElementById('gender')).value = '';
          (<HTMLInputElement>document.getElementById('txtContact')).value = '';
        } else {
          this.errorMessage = 'Something went wrong! Try again later.';
          this.ShowAlert(true, 'alertDivReg');
          this.timeout(false, 'alertDivReg');
        }
      });
  }

  logout() {
    this.sessionservice.logoutUser();

    this.loggedIn = this.sessionservice.getUserLoggedIn();
    this.router.navigate(['home']);
  }

  checkEmail(Email: string) {
    this.userObj.checkEmail(Email).subscribe(res => {
      if (res['key'] === 'true') {
        this.errorMessage = 'Email is already registered.';
        this.ShowAlert(true, 'alertDivReg');
        this.timeout(false, 'alertDivReg');
        this.flagEmail = true;
      } else {
        this.flagEmail = false;
      }
    });
  }

  checkPhoneNo(PhoneNo: string) {
    this.userObj.checkPhoneNo(PhoneNo).subscribe(res => {
      if (res['key'] === 'true') {
        this.errorMessage = 'Phone number is already registered.';
        this.ShowAlert(true, 'alertDivReg');
        this.timeout(false, 'alertDivReg');
        this.flagPhoneNo = true;
      } else {
        this.flagPhoneNo = false;
      }
    });
  }

  cartRefresh() {
    this.userObj.getUserCart(this.sessionservice.getUserID()).subscribe(res => {
      this.cartData = res['records'];
    });
  }

  removeFromCart(CartID: string) {
    this.productObj.removeFromCart(CartID).subscribe(res => {
      this.ngOnInit();
    });
  }

  SearchTrigger(event) {
    event.preventDefault();
    if (
      document
        .getElementById('cd-search-trigger')
        .classList.contains('search-is-visible')
    ) {
      document
        .getElementById('cd-search-trigger')
        .classList.remove('search-is-visible');
      document.getElementById('cd-search').classList.remove('is-visible');
    } else {
      document
        .getElementById('cd-search-trigger')
        .classList.add('search-is-visible');
      document.getElementById('cd-search').classList.add('is-visible');
    }
  }

  search() {
    const SearchedTerm = (<HTMLInputElement>(
      document.getElementById('txtSearch')
    )).value;
    if (location.pathname !== '/productsearch') {
      this.router.navigate(['/productsearch'], {
        queryParams: { srchTerm: SearchedTerm }
      });
    } else {
      this.ngOnInit();
      this.router.navigate(['/productsearch'], {
        queryParams: { srchTerm: SearchedTerm }
      });
    }

  }
}
