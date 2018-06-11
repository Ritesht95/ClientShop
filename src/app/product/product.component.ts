import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../classes/product';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productID: string;
  productData = '';
  env = environment.apiURL;

  constructor(private actRoute: ActivatedRoute, private productObj: Product) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.productID = params['ProdID'];
    });
    this.productObj.getSingleProduct(this.productID).subscribe(
      res => {
        this.productData = res;
      }
    );
  }

}
