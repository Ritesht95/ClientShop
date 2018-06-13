import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: any = '';
  env = environment.apiURL;

  constructor( private router: Router, private services: ServicesService, private sessionservice: SessionService) { }

  ngOnInit() {
    this.env = environment.apiURL;
    this.services.getAllOrder(this.sessionservice.getUserID()).subscribe(res => {
      if (res['key'] === 'false') {
        this.order = res;
        console.log(this.order);
      } else {
        this.order = res['records'];
        console.log(this.order);
      }
    });
  }

}
