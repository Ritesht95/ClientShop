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

  constructor(private _http: Http) { }

  getWebInfo() {
    return this._http
      .get(environment.apiURL + 'Website/GetWebInfo.php')
      .pipe(map(res => res.json()));
  }

  getProduct(id: number) {
    return this._http
      .get(environment.apiURL + 'Product/GetCategoryProducts.php?id=' + id)
      .pipe(map(res => res.json()));
  }

}
