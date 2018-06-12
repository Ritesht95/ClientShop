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

  constructor(private http: Http) {}

  getSingleProduct(ProductID: string) {
    return this.http
      .get(environment.apiURL + 'Product/SingleProductData.php?id=' + ProductID)
      .pipe(map(res => res.json()));
  }

  addToCart(UserID: string, ProductID: string, Quantity: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      UserID: UserID,
      ProductID: ProductID,
      Quantity: Quantity
    };

    return this.http
      .post(environment.apiURL + 'Cart/AddToCart.php', data, options)
      .pipe(map(res => res.json()));
  }

  changeCartQuantity(CartID: string, Quantity: number) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      CartID: CartID,
      Quantity: Quantity
    };

    return this.http
      .post(environment.apiURL + 'Cart/AddQuantity.php', data, options)
      .pipe(map(res => res.json()));
  }

  removeFromCart(CartID: string) {
    return this.http
      .get(environment.apiURL + 'Cart/DeleteFromCart.php?id=' + CartID)
      .pipe(map(res => res.json()));
  }

  placeOrder(TotalAmount: string, AddressID: string, UserID: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      TotalAmount: TotalAmount,
      AddressID: AddressID,
      UserID: UserID
    };

    return this.http
      .post(environment.apiURL + 'Cart/CheckOut.php', data, options)
      .pipe(map(res => res.json()));
  }

}
