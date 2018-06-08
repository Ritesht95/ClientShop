import { map } from 'rxjs/internal/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Category {
  CategoryID: string;
  CategoryName: string;
  CategoryImage: string;
  CategoryImageAlt: string;
  ShopID: string;

  constructor(private http: Http) {

  }

  getAllCategories() {
    return this.http
      .get(environment.apiURL + 'Category/UserPurchaseCategory.php')
      .pipe(map(res => res.json()));
  }
}
