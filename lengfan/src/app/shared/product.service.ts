import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http} from '@angular/http';
import {filter} from 'rxjs/operator/filter';
@Injectable()
export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();
  constructor(private  http: Http) { }
  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products').map(res => res.json());
  }
  getProduct( id: number): Observable<Product> {
    return this.http.get('/api/product?id=' + id).map(res => res.json());

  }
  getCommentsForProductId ( id: number): Observable<Comment[]> {
    return this.http.get('/api/comments?id=' + id + '/')
      .map(res => res.json() );

  }
  getAllCategories(): string[] {
    return ['手办收藏' , '蓝光CD' , '同人本子'] ;
  }

  search(params: ProductSearchParams): Observable<Product[]> {
   return this.http.get('/api/productSearch?', {search : 'title=' + params.title + '&price=' + params.price + '&category=' + params.category }
      )
      .map(res => res.json());


  }

  private encodeParams(params: ProductSearchParams) {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce(( sum: URLSearchParams, key: string) => {
        sum.append(key, params[key]);
        return sum;
      }, new URLSearchParams());
  }

}
export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public url: string,
    public categories: string
  ) {


  }


}
export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {


  }


}
export  class Comment {
  constructor(public id: number,
              public productId: number,
              public user: string ,
              public rating: number,
              public timestamp: string,
              public content: string) {}
}
