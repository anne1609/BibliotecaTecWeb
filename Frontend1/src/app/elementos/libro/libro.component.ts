import { Component, Input } from '@angular/core';
import { ServicioService } from '../../servicios/servicio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {

  
  libro: any;
//   libro = {
//     "_id": 3,
//     "autor": "Arthur C. Clarke",
//     "categoria": "Ciencia Ficción",
//     "titulo": "2001: Una odisea espacial",
//     "subtitulo": "El amanecer de la humanidad",
//     "isbn13": "9780451457998",
//     "precio": "$11.25",
//     "resumen": "Una exploración épica del espacio y la evolución humana.",
//     "image": "https://m.media-amazon.com/images/I/51QYe2r4SuL._SY445_SX342_.jpg",
//     "rating": 4.9,
//     "paginas": 450,
//     "idioma": "Español",
//     "formato": "Tapa blanda",
//     "fecha_publicacion": "2022-07-10"
// };

  constructor(private libroService: ServicioService, private route: ActivatedRoute){

  }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.libroService.obtenerLibro(id)
      .subscribe(l => this.libro = l);

    console.log(this.libro)
  }
}
