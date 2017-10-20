import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../shared/product.service';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private  products: Observable<Product[]>;

  constructor(private productService: ProductService) {
    /* 订阅流
    * */
    // this.titleFilter.valueChanges
    //   .debounceTime(500)
    //   .subscribe(
    //     value => this.keyword = value
    //   );
  }
  /*
  * 初始化 ngOnInit
  * */
  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.search(params)
    );
  }

}

