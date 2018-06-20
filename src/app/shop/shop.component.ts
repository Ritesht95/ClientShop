import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../classes/product';
import { SessionService } from '../services/session.service';
import { HeaderComponent } from '../header/header.component';
import { User } from '../classes/user';
import { Route } from '@angular/compiler/src/core';
import { Category } from '../classes/category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  id: number;
  env = environment.apiURL;
  product: any = '';
  name: any = '';
  filtersData = '';
  minPrice;
  maxPrice;

  constructor(
    private servicesservice: ServicesService,
    private actRoute: ActivatedRoute,
    private productObj: Product,
    private sessionservice: SessionService,
    private userObj: User,
    private router: Router
  ) {}

  ngOnInit() {
    this.env = environment.apiURL;
    this.actRoute.queryParams.subscribe(param => {
      this.id = param['id'];
    });
    this.servicesservice.getFilterProperties(this.id).subscribe(res => {
      this.filtersData = res['records'];
      this.minPrice = res['Min'];
      this.maxPrice = res['Max'];
    });
    this.servicesservice.getProduct(this.id).subscribe(res => {
      if (res['key'] === 'false') {
        this.product = res;
      } else {
        this.product = res['records'];
        if (this.product.length === 0) {
          document.getElementById('divNotFound').style.display = 'block';
        } else {
          document.getElementById('divNotFound').style.display = 'none';
        }
      }
    });
    this.loadScripts();
  }

  loadScripts() {
    // tslint:disable-next-line:max-line-length
    const dynamicScripts = ['../../assets/js/priceSlider.js'];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('body')[0].appendChild(node);
    }
  }

  addToCart(ProductID: string) {
    if (this.sessionservice.getUserLoggedIn() === 'true') {
      this.productObj
        .addToCart(this.sessionservice.getUserID(), ProductID, '1')
        .subscribe(res => {
          if (res['key'] === 'true') {
            document.getElementById('btnOpenCart').click();
          }
        });
    } else {
      document.getElementById('btnLoginModalOpen').click();
    }
  }

  sendFilters(formValues: any) {
    // tslint:disable-next-line:prefer-const
    let data: Array<any> = new Array<any>();
    let searchterm;
    const priceRangeVal = (<HTMLInputElement>document.getElementById('amount'))
      .value;
    Object.keys(formValues).forEach(element => {
      let obj;
      if (element !== 'txtSearch') {
        obj = { key: element, value: formValues[element] };
        data.push(obj);
      } else {
        searchterm = formValues[element];
      }
    });
    // tslint:disable-next-line:prefer-const
    let priceRangeVals = priceRangeVal.split('-');
    this.servicesservice
      .sendFilters(
        this.id,
        data,
        searchterm,
        priceRangeVals[0],
        priceRangeVals[1]
      )
      .subscribe(res => {
        this.product = res['records'];
        if (this.product.length === 0) {
          document.getElementById('divNotFound').style.display = 'block';
        } else {
          document.getElementById('divNotFound').style.display = 'none';
        }
      });
  }

  resetFilters() {
    this.loadScripts();
    this.servicesservice.getProduct(this.id).subscribe(res => {
      if (res['key'] === 'false') {
        this.product = res;
      } else {
        this.product = res['records'];
        if (this.product.length === 0) {
          document.getElementById('divNotFound').style.display = 'block';
        } else {
          document.getElementById('divNotFound').style.display = 'none';
        }
      }
    });
  }
}
