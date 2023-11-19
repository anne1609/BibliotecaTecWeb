import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './elementos/restaurant/restaurant.component';
import { DetalleRestaurantComponent } from './elementos/detalle-restaurant/detalle-restaurant.component';
import { RestaurantsComponent } from './paginas/restaurants/restaurants.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    DetalleRestaurantComponent,
    RestaurantsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
