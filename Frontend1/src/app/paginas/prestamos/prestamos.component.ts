import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioService } from '../../servicios/servicio.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpFinalizarPrestamoComponent } from '../../elementos/pop-up-finalizar-prestamo/pop-up-finalizar-prestamo.component';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  filtro: string = '';
  listaPrestamos: any[] = [];
  listaPrestamosOriginal: any[] = []; // Nueva propiedad para guardar la lista original

  constructor(private prestamosService: ServicioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerPrestamos();
  }

  obtenerPrestamos(): void {
    this.prestamosService.obtenerPrestamos().subscribe(
      (prestamos: string[]) => {
        this.listaPrestamos = prestamos.map(prestamo => JSON.parse(prestamo));
        this.listaPrestamosOriginal = [...this.listaPrestamos]; // Guardamos una copia de la lista original
        console.log(this.listaPrestamos);  
      },
      (error) => {
        console.error('Error al obtener los préstamos', error);
      }
    );
  }

  openDialog(prestamoId: string): void {
    this.dialog.open(PopUpFinalizarPrestamoComponent, {
      data: { id: prestamoId }
    });
  }

  filtrarUsuario(filtro: string) {
    if (!filtro) {
      this.listaPrestamos = [...this.listaPrestamosOriginal]; 
    } else {
      this.listaPrestamos = this.listaPrestamosOriginal.filter((prestamo: { nombreUsuario: string }) => {
        return prestamo.nombreUsuario.toLowerCase().includes(filtro.toLowerCase());
      });
    }
  }
}