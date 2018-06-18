import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../classes/product';
import { SessionService } from '../services/session.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-productsearch',
  templateUrl: './productsearch.component.html',
  styleUrls: ['./productsearch.component.css']
})
export class ProductsearchComponent implements OnInit {

  product: any = '';
  searchTerm: any;
  env = environment.apiURL;

  constructor(
    private actRoute: ActivatedRoute,
    private productObj: Product,
    private sessionservice: SessionService
  ) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(param => {
      this.searchTerm = param['srchTerm'];
    });
    this.productObj.searchProduct(this.searchTerm).subscribe(
      res => {
        this.product = res['records'];
      }
    );
  }

  addToCart(ProductID: string) {
    if (this.sessionservice.getUserLoggedIn()) {
      this.productObj
        .addToCart(this.sessionservice.getUserID(), ProductID, '1')
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
