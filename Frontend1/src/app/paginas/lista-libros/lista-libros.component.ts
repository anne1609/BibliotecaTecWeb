import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicioService } from '../../servicios/servicio.service';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrl: './lista-libros.component.css'
})
export class ListaLibrosComponent implements OnInit{
  filtro: string = '';
  /*libros = [
    { titulo: 'Libro 1', descripcion: 'Descripción del Libro 1', imagen: '1.png' },
    { titulo: 'Libro 2', descripcion: 'Descripción del Libro 2', imagen: '2.png' },
 
  ];*/
  
  libros:any;
  constructor(private dialog: MatDialog, private productosService: ServicioService,) {}

  ngOnInit(){
    this.productosService.obtenerLibros().subscribe(
      data => this.libros = data,
      error => console.log(error),
      () => console.log("FIN")
    )
    console.log(this.libros)
  }

  editarLibro(libro: any) {
    // Implementa la lógica para editar el libro según tus necesidades.
    console.log('Editar libro:', libro);
  }

  eliminarLibro(libro: any) {
    // Implementa la lógica para eliminar el libro según tus necesidades.
    console.log('Eliminar libro:', libro);
  }

  /*get librosFiltrados(): any[] {
    return this.libros.filter(libro => libro.titulo.toLowerCase().includes(this.filtro.toLowerCase()));
  }*/

}
