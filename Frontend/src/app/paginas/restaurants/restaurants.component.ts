import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../servicios/servicio.service';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent implements OnInit{
  restaurants: any
  constructor(private servicio:ServicioService){}
  
  ngOnInit(): void {
    this.servicio.obtenerRestaurants().subscribe(
      data => this.restaurants = data,
      error => console.log(error),
      () => console.log('FIN')
    )
  }
}
