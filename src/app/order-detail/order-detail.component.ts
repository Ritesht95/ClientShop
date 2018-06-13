import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: any = '';
  env = environment.apiURL;

  constructor(private router: Router, private services: ServicesService) { }

  ngOnInit() {
    this.env = environment.apiURL;
    this.services.getSingleOrder(11).subscribe(res => {
      if (res['key'] === 'false') {
        this.order = res;
        console.log(this.order);
      } else {
        this.order = res;
        console.log(this.order);
      }
    });
  }

}
