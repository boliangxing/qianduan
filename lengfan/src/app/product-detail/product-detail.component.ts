import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService, Comment} from '../shared/product.service';
import {Observable} from 'rxjs/Observable';
import {WebsocketService} from "../shared/web-socket.service";
import {subscriptionLogsToBeFn} from "rxjs/testing/TestScheduler";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  comments: Comment[];
  newRating: number = 5;
  newComment: string = "";
  isCommentHidden = true;
  isWatched: boolean = false;
  currentBid: number ;
  subscripton: Subscription;
  constructor(private routeInfo: ActivatedRoute,
              private  productService: ProductService,
              private  wsService: WebsocketService
              ) { }

  ngOnInit() {
    let productId: number = this.routeInfo.snapshot.params['productId'];
   this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        this.currentBid = product[0].price; }
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );
  }
  addComment() {
   let comment = new Comment(0, 1, '游客' , this.newRating , new Date().toISOString(), this.newComment) ;
   this.comments.unshift(comment);
   this.newComment = null;
   this.newRating = 5 ;
   this.isCommentHidden = true;
   let sum = this.comments.reduce( ( sum, comment) => sum + comment.rating, 0);
   this.product.rating = sum / this.comments.length;
   console.log(this.product);
  }
  watchProduct() {
    if (this.subscripton) {
      this.subscripton.unsubscribe();
      this.isWatched = false;
      this.subscripton = null;
    } else {
    this.isWatched = true;

    this.subscripton = this.wsService.createObservableSocket('wss://www.lengfanretui.cn:8080', this.product.id)
      .subscribe(
        products => {
          //let product = products.find()
          //console.log(products);
          this.currentBid = products;
        }
      );
    }
  }
}
