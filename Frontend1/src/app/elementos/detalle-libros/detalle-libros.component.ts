import { Component ,Input, Output } from '@angular/core';

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
