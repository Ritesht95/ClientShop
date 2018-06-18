import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private _http: Http) {}

  getWebInfo() {
    return this._http
      .get(environment.apiURL + 'Website/GetWebInfo.php')
      .pipe(map(res => res.json()));
  }

  getMostSold() {
    return this._http
      .get(environment.apiURL + 'Product/MostSold.php')
      .pipe(map(res => res.json()));
  }

  getDeal() {
    return this._http
      .get(environment.apiURL + 'Product/MostDiscount.php')
      .pipe(map(res => res.json()));
  }


  getAllOrder(id: number) {
    return this._http
      .get(environment.apiURL + 'Order/GetUserOrders.php?id=' + id)
      .pipe(map(res => res.json()));
  }

  getSingleOrder(id: number) {
    return this._http
      .get(environment.apiURL + 'Order/SingleOrderDetail.php?id=' + id)
      .pipe(map(res => res.json()));
  }

  getProduct(id: number) {
    return this._http
      .get(environment.apiURL + 'Product/GetCategoryProducts.php?id=' + id)
      .pipe(map(res => res.json()));
  }

  sendMessage(Name: string, Email: string, Message: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      Name: Name,
      Email: Email,
      Feedback: Message,
      Type: 'user'
    };
    return this._http
      .post(environment.apiURL + 'feedback/addfeedback.php', data, options)
      .pipe(map(res => res.json()));
  }

  cancelOrder(OrderDetailsID: string) {
    return this._http
      .get(environment.apiURL + 'Order/OrderCancelled.php?id=' + OrderDetailsID)
      .pipe(map(res => res.json()));
  }

  getFilterProperties(CategoryID: number) {
    return this._http
      .get(environment.apiURL + 'Product/CategoryFilter.php?id=' + CategoryID)
      .pipe(map(res => res.json()));
  }

  sendFilters(
    CategoryID: number,
    formValues: any,
    SearchTerm: string,
    Min: string,
    Max: string
  ) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    });
    const data: object = {
      CategoryID: CategoryID,
      Data: formValues,
      Search: SearchTerm,
      Min: Min,
      Max: Max
    };
    const options = new RequestOptions({ headers: headers });
    return this._http
      .post(environment.apiURL + 'Product/FilterData.php', data, options)
      .pipe(map(res => res.json()));
  }
}
