import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { StarsComponent } from './stars/stars.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchComponent } from './search/search.component';
import {HomeComponent} from './home/home.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductService} from 'app/shared/product.service';
import {WebsocketService} from './shared/web-socket.service';
import { FilterPipe } from './pipe/filter.pipe';
const routeConfig: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product/:productId', component: ProductDetailComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    StarsComponent,
    ProductComponent,
    NavbarComponent,
    CarouselComponent,
    SearchComponent,
    HomeComponent,
    ProductDetailComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig),
    ReactiveFormsModule
  ],
  providers: [ProductService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
