import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../classes/product';
import { SessionService } from '../services/session.service';

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

  constructor(
    private servicesservice: ServicesService,
    private actRoute: ActivatedRoute,
    private productObj: Product,
    private sessionservice: SessionService
  ) {}

  ngOnInit() {
    this.env = environment.apiURL;
    this.actRoute.queryParams.subscribe(param => {
      this.id = param['id'];
    });
    this.servicesservice.getProduct(this.id).subscribe(res => {
      if (res['key'] === 'false') {
        this.product = res;
      } else {
        this.product = res['records'];
      }
    });
  }

  addToCart(ProductID: string) {
    this.productObj
      .addToCart(this.sessionservice.getUserID(), ProductID, '1')
      .subscribe(res => {
        if (res['key'] === 'true') {
          alert('Added to cart.');
        }
      });
  }
}
