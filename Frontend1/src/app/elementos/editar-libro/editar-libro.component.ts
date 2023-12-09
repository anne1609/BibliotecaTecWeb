import { Component, Input } from '@angular/core';
import { ServicioService } from '../../servicios/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrl: './editar-libro.component.css'
})
export class EditarLibroComponent {

  libro: any;
  constructor(private service: ServicioService, private snackBar: MatSnackBar , private location: Location,private route: ActivatedRoute) { }
  bookForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    autor: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    subtitulo: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    isbn13: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    resumen: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    paginas: new FormControl('', Validators.required),
    idioma: new FormControl('', Validators.required),
    formato: new FormControl('', Validators.required),
    fecha_publicacion: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.obtenerLibro(id).subscribe(
      (l: any) => {
        this.libro = l;
        this.fillFormWithData();
      },
      error => {
        console.error('Error al obtener el libro:', error);
      }
    );

  }

  fillFormWithData(): void {
    if (this.libro) {
      this.bookForm.patchValue({
        titulo: this.libro.titulo,
        autor: this.libro.autor,
        categoria: this.libro.categoria ,
        subtitulo: this.libro.subtitulo,
        rating: this.libro.rating,
        isbn13: this.libro.isbn13,
        precio: this.libro.precio,
        resumen: this.libro.resumen,
        image: this.libro.image,
        paginas: this.libro.paginas,
        idioma: this.libro.idioma,
        formato: this.libro.formato,
        fecha_publicacion: this.libro.fecha_publicacion,
        cantidad: this.libro.cantidad
      })
  }
  }
  update() {
    console.log('Update method called');
    if (this.bookForm.valid) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.service.editar(id, this.bookForm.value).subscribe(
        response => {
          this.snackBar.open('Libro actualizado con éxito', '', { duration: 3000 });
          this.location.back();
        },
        error => {
          console.error('Error al actualizar el libro:', error);
        }
      );
    } else {
      this.snackBar.open('Por favor, rellena todos los campos requeridos', '', { duration: 3000 });
    }
  }
}

