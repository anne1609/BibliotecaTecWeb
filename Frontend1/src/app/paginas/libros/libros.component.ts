import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../servicios/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit{
  datos:any
  constructor( 
    private productosService: ServicioService,
    private route: ActivatedRoute,
   
    ) {}
  ngOnInit(){
    this.productosService.obtenerLibros().subscribe(
      data => this.datos = data,
      error => console.log(error),
      () => console.log("FIN")
    )
    console.log(this.datos)
  }
}
