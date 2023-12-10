import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicioService } from '../../servicios/servicio.service';
import { User, UserServiceService } from '../../servicios/user-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.component.html',
  styleUrl: './mis-libros.component.css'
})
export class MisLibrosComponent {
  private userSubscription: Subscription = new Subscription;
  libros:any;
  id:string = "";
  
  constructor(
    private dialog: MatDialog, 
    private productosService: ServicioService,
    private userService: UserServiceService,
    ) {}

  ngOnInit(){
    this.userSubscription = this.userService.getUser().subscribe((user: User | null | string) => {
      let userObj: User | null = null;
      if (typeof user === 'string') {
        userObj = JSON.parse(user);
      } else {
        userObj = user;
      }
      if (userObj) {
        this.id = userObj._id; 
      }
    });
    this.obtenerlibros(this.id);
  }

  obtenerlibros(id:string){
    this.productosService.obtenerPrestamosDeUsuario(id).subscribe(
      data => this.libros = data,
      error => console.log(error)
    )

  }

}
