import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Product } from '../classes/product';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: any = '';
  env = environment.apiURL;
  orderDetailsID = 0;
  trackingData = '';
  liCounter = 0;

  constructor(
    private router: Router,
    private services: ServicesService,
    private actRoute: ActivatedRoute,
    private productObj: Product
  ) {}

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.orderDetailsID = params['ODID'];
    });
    this.services.getSingleOrder(this.orderDetailsID).subscribe(res => {
      if (res['key'] === 'false') {
        this.order = res;
        console.log(this.order);
      } else {
        this.order = res;
        console.log(this.order);
      }
    });
    this.productObj
      .getTrackingDetails(this.orderDetailsID.toString())
      .subscribe(res => {
        this.trackingData = res['records'];
      });
  }
}
