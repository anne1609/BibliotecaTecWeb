import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioService } from '../../servicios/servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-registrar-libro',
  templateUrl: './registrar-libro.component.html',
  styleUrls: ['./registrar-libro.component.css']
})
export class RegistrarLibroComponent implements OnInit {
  constructor(private service: ServicioService, private snackBar: MatSnackBar , private location: Location,private datePipe: DatePipe) { }
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
  });

  ngOnInit(): void {}

  onSubmit() {
  
    const bookData = this.bookForm.value;
    bookData.fecha_publicacion = this.datePipe.transform(bookData.fecha_publicacion, 'yyyy-MM-dd');
    this.service.addBook(bookData).subscribe(
      response => {
        console.log('Book added successfully:', response);
        this.bookForm.reset();
        this.snackBar.open('Libro registrado con éxito', 'Cerrar', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          this.location.back(); 
        });
      },
      error => {
        console.error('Error adding book:', error);
      }
    );
  }
  
}