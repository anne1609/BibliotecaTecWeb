import { Component, Input } from '@angular/core';
import { ServicioService } from '../../servicios/servicio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {

  
  @Input() libro: any;

  constructor(private libroService: ServicioService, private route: ActivatedRoute){

  }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.libroService.obtenerLibro(id)
      .subscribe(l => this.libro = l);

    // console.log(this.libro)
  }
}
