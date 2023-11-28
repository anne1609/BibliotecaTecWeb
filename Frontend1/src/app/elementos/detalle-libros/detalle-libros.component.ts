import { Component ,Input, Output } from '@angular/core';
import { ServicioService } from '../../servicios/servicio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-libros',
  templateUrl: './detalle-libros.component.html',
  styleUrl: './detalle-libros.component.css'
})
export class DetalleLibrosComponent {
  @Input() imagen: string = "";
  @Input() titulo: string = "";
  @Input() precio: string = "";
  @Input() id: string ="";

}
