import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../services/services.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // img: Array<any> = [];
  // items: Array<any> = [];
  // i = 0;
  // j = 0;
  // n = 0;
  // m = 0;
  // t = 0;
  // y = 0;
  // x = 0;
 
  // c = 0;
  // cc = 0;
  // k = 0;
  // o = 0;
  // q = 0;
  // r = 0;
  // product2: any = '';
  // e = 0;
  // p = 0;
  // temp = '';
  // l = 0;
  // s: any[][] = [[], []];
  // s3: any[][] = [[], []];
  env = environment.apiURL;
  MostSoldProduct: any = '';
  MostDiscounttedProduct: any = '';
  TopCategoty: any = '';
  SoldProducts: string[][] = [[], []];
  m: number = 0;
  i: number = 0;
  j: number = 0;

  constructor(
    private _http: HttpClient,
    private servicesservice: ServicesService,
    private router: Router
  ) {

  
  }

  ngOnInit() {

    this.env = environment.apiURL;
    this.servicesservice.getMostSold()
    .subscribe(
      res => {
        if(res['key'] !== 'false'){
          this.MostSoldProduct = res;
        }
      });

    this.servicesservice.getDeal()
    .subscribe(
      res=>{
        if(res['key'] !== 'false'){
          this.MostDiscounttedProduct = res;
        }
    });

    this.servicesservice.getTopCategories()
    .subscribe(
      res => {
        if(res['key'] !== 'false'){
          this.TopCategoty = res['records'];
        }
      });
  }




}
