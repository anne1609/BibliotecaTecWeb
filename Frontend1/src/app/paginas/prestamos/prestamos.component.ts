import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioService } from '../../servicios/servicio.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class PrestamosComponent implements OnInit {
  listaPrestamos: any[] = [];

  constructor(private prestamosService: ServicioService) { }

  ngOnInit(): void {
    this.obtenerPrestamos();
  }

  obtenerPrestamos(): void {
    this.prestamosService.obtenerPrestamos().subscribe(
      (prestamos) => {
        this.listaPrestamos = prestamos;
      },
      (error) => {
        console.error('Error al obtener los préstamos', error);
      }
    );
  }
}
