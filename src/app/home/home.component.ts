import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../services/services.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  img: Array<any> = [];
  items: Array<any> = [];
  i = 0;
  j = 0;
  n = 0;
  m = 0;
  t = 0;
  y = 0;
  x = 0;
  d: any[][][] = [[], [], []];
  c = 0;
  cc = 0;
  k = 0;
  o = 0;
  q = 0;
  r = 0;
  product2: any = '';
  e = 0;
  p = 0;
  temp = '';
  l = 0;
  s: any[][] = [[], []];
  s3: any[][] = [[], []];
  images: Array<string>;
  env = environment.apiURL;
  product: any = '';

  constructor(
    config: NgbCarouselConfig,
    private _http: HttpClient,
    private servicesservice: ServicesService,
    private router: Router
  ) {
    this.items = [
      { name: '../../assets/images/3.jpeg' },
      { name: '../../assets/images/ab.jpg' },
      { name: '../../assets/images/banner1.jpg' },
      { name: '../../assets/images/d1.jpg' }
    ];
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    this.env = environment.apiURL;
    this.servicesservice.getMostSold().subscribe(res => {
      if (res['key'] === 'false') {
        this.product = res;
      } else {
        this.product = res['records'];
        // console.log(this.product);
        this.t = this.product.length / 2;
        for (this.m = 0; this.m < this.product.length; this.m++) {
          if (this.j >= 4) {
            this.i++;
            this.j = 0;
          }
          // console.log(
          //   this.i + ' ' + this.j + ' ' + this.product[this.m]['image']
          // );
          this.s[this.i][this.j++] = this.product[this.m]['image'];

          // console.log(this.s);

        }
      }
    });
    this.servicesservice.getDeal().subscribe(res => {
      if (res['key'] === 'false') {
        this.product2 = res;
      } else {
        this.product2 = res['records'];
        console.log(this.product2);
        this.i = 0;
        this.j = 0;
        for (this.m = 0; this.m < this.product.length; this.m++) {
          if (this.j >= 4) {
            this.i++;
            this.j = 0;
          }
          this.cc = 0;
          // console.log(
          //   this.i + ' ' + this.j + ' ' + this.cc + ' ' +this.product[this.m]['image']
          // );
          // this.cc = 0;
          console.log(this.d);
         this.d[this.i][this.j][this.cc++] =  this.product2[this.m]['image'];
        this.d[this.i][this.j][this.cc] = this.product2[this.m]['FinalPrice'];
          this.j++;

        }
        console.log(this.d);
        // for (this.e = 0; this.e < this.product2.length ; this.e++) {
        //   if (this.c >= 4) {
        //     this.k++;
        //     this.c = 0;
        //   }
        //   if (this.cc >= 2) {
        //     this.cc = 0;
        //     this.c++;
        //   }
        //   this.d[this.k][this.c][this.cc] = this.product2[this.e]['image'];
        //   this.s3[this.k][this.c][this.cc++] = this.product2[this.e]['FinalPrice'];
        //   console.log(this.d);
        //   console.log(this.s3);
        // }
      }
    });
  }

  ngOnInit() {
    this.img[0] = '../../assets/images/3.jpeg';
    this.img[1] = '../../assets/images/ab.jpg';
    this.img[2] = '../../assets/images/banner1.jpg';
    this.img[3] = '../../assets/images/d1.jpg';
    this._http
      .get('https://picsum.photos/list')
      .pipe(
        map((images: Array<{ id: number }>) => this._randomImageUrls(images))
      )
      .subscribe(images => (this.images = images));
  }

  private _randomImageUrls(images: Array<{ id: number }>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
  }

  // slider() {
  //     if ( this.i > 3) {
  //       this.i = 0;
  //     }
  //   setTimeout(() => {
  //     document.getElementById('hello').innerHTML = '<img src= "' + this.img[this.i] + '" width= "500px" height= "500px">' ;
  //   }, 3000);
  //   console.log(this.i);
  //   this.i++;
  //   this.slider();
  // }
}
