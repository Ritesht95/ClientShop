import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../classes/product';
import { environment } from '../../environments/environment';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productID: string;
  productData = '';
  env = environment.apiURL;

  constructor(
    private actRoute: ActivatedRoute,
    private productObj: Product,
    private sessionservice: SessionService
  ) {
    this.loadScripts();
  }
  loadScripts() {
    // tslint:disable-next-line:max-line-length
    const dynamicScripts = ['../../assets/js/slideGen.js'];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.productID = params['ProdID'];
    });
    this.productObj.getSingleProduct(this.productID).subscribe(res => {
      this.productData = res;
    });
  }

  addToCart(Quantity: string) {
    if (this.sessionservice.getUserLoggedIn()) {
      this.productObj
        .addToCart(this.sessionservice.getUserID(), this.productID, Quantity)
        .subscribe(res => {
          if (res['key'] === 'true') {
            alert('Added to cart.');
          }
        });
    } else {
      document.getElementById('btnLoginModalOpen').click();
    }
  }
}
