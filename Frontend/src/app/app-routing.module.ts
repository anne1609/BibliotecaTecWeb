import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './paginas/restaurants/restaurants.component';
import { RestaurantComponent } from './elementos/restaurant/restaurant.component';

const routes: Routes = [
  {path: "restaurantes", component:RestaurantsComponent},
  {path: "restaurant", component:RestaurantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
