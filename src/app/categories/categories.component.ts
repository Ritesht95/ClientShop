import { Component, OnInit } from '@angular/core';
import { Category } from '../classes/category';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesData = [];
  env = environment.apiURL;

  constructor(private categoryObj: Category) { }

  ngOnInit() {
    this.categoryObj.getAllCategories().subscribe(
      res => {
        this.categoriesData = res['records'];
      }
    );
  }

}
