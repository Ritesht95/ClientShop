import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { SessionService } from '../services/session.service';
import { environment } from '../../environments/environment';
import { Product } from '../classes/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartData: any = '';
  env = environment.apiURL;
  totalAmount = 0;
  totalSingle: string[][] = [[], []];
  addressData = [];
  selectedAddressID = '';
  errorMessage = null;

  constructor(
    private userObj: User,
    private sessionservice: SessionService,
    private productObj: Product
  ) {}

  ngOnInit() {
    this.userObj.getUserCart(this.sessionservice.getUserID()).subscribe(res => {
      this.cartData = res['records'];
      this.totalAmount = 0;
      for (let index = 0; index < res['records'].length; index++) {
        this.totalSingle[index]['Price'] =
          res['records'][index]['Price'] * res['records'][index]['Qty'];
        this.totalSingle[index]['ProductName'] =
          res['records'][index]['ProductName'];
        this.totalAmount += this.totalSingle[index]['Price'];
      }
    });
    this.userObj
      .getUserAddresses(this.sessionservice.getUserID())
      .subscribe(res => {
        this.addressData = res['records'];
        this.addressData.forEach(element => {
          element['Address'] = element['Address'].split(',');
        });
      });
  }

  timeout(val: boolean, element: string) {
    setTimeout(this.ShowAlert, 5000, val, element);
  }

  ShowAlert(val: boolean, element: string) {
    const alertDiv = document.getElementById(element);
    alertDiv.style.display = val ? 'block' : 'none';
    if (!val) {
    }
  }

  changeQauntity(
    Quantity: number,
    Operation: string,
    CartID: string,
    Price: number
  ) {
    if (Operation === 'plus') {
      Quantity++;
      this.productObj.changeCartQuantity(CartID, Quantity).subscribe(res => {
        if (res['key'] === 'false') {
          alert('There is no more stock available.');
        }
        this.ngOnInit();
      });
    } else {
      if (Quantity > 1) {
        Quantity--;
        this.productObj.changeCartQuantity(CartID, Quantity).subscribe(res => {
          this.ngOnInit();
        });
      }
    }
  }

  removeFromCart(CartID: string) {
    this.productObj.removeFromCart(CartID).subscribe(res => {
      this.ngOnInit();
    });
  }

  addrSelected(AddressID: string) {
    this.removeSelectedAddress();
    document.getElementById('div' + AddressID).style.border = 'solid';
    this.selectedAddressID = AddressID;
  }

  removeSelectedAddress() {
    this.addressData.forEach(element => {
      document.getElementById('div' + element.AddressID).style.border = 'none';
    });
  }

  placeOrder() {
    this.productObj
      .placeOrder(
        this.totalAmount.toString(),
        this.selectedAddressID,
        this.sessionservice.getUserID()
      )
      .subscribe(res => {
        this.errorMessage = null;
        if (res['key'] === 'sp') {
          res['records'].forEach(element => {
            this.errorMessage =
              '<h4 class="text-danger">Sorry! Available Stock for ' +
              element.ProductName +
              ' is ' +
              element.CurrentStock +
              '<h4/>';
              document.getElementById('alertDiv').innerHTML = document.getElementById('alertDiv').innerHTML + this.errorMessage;
              this.ShowAlert(true, 'alertDiv');
              this.timeout(false, 'alertDiv');
          });
        }
      });
  }
}
