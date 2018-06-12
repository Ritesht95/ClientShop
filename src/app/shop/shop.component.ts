import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private servicesservice: ServicesService, private actRoute: ActivatedRoute) { }

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

}
