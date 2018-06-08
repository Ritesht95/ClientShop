import { map } from 'rxjs/internal/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Product {
  ProductID: string;
  ProductName: string;
  ProductDesc: string;
  CategoryName: string;
  image: Array<string>;
  ImageAlt: string;
  Price: string;
  FinalPrice: string;
  Unit: string;
  Discount: Array<string>;
  Properties: Array<string>;

  constructor(private http: Http) {

  }

  getSingleProduct(ProductID: string) {
    return this.http
      .get(environment.apiURL + 'Product/SingleProductData.php?id=' + ProductID)
      .pipe(map(res => res.json()));
  }
}
