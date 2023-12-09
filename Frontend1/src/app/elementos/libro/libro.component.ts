import { Component, Input } from '@angular/core';
import { ServicioService } from '../../servicios/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { User, UserServiceService } from '../../servicios/user-service.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
  libro: any;
  esAutor: boolean = false;
  esLector: boolean = false;
  usuario: User | null = null;
  private userSubscription: Subscription = new Subscription;

  constructor(
    private libroService: ServicioService, 
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar, 
    private userService: UserServiceService,
    private router: Router
    ){
  }
  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.libroService.obtenerLibro(id)
      .subscribe(l => this.libro = l);
      this.userSubscription = this.userService.getUser().subscribe((user: User | null | string) => {
        let userObj: User | null = null;
        if (typeof user === 'string') {
          userObj = JSON.parse(user);
          this.usuario = userObj;
        } else {
          userObj = user;
        } 
        if (userObj) {
          this.esAutor = userObj.tipo === 'autor';
          this.esLector = userObj.tipo === 'lector'; 
        }
      });
  }

  eliminarLibro(libro: any) {
    console.log('Eliminar libro:', libro);
    if (libro && libro._id) {
      this.libroService.deleteBook(libro._id).subscribe(
        response => {
          console.log('Book deleted successfully:', response);
          this.snackBar.open('Libro borrado exitosamente', 'Cerrar', {
            duration: 500,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/lista-libros']); 
          });
        },
        error => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }
  prestarLibro(libro:any){
    //Recuperando info necesaria para escribir en la BD
    let idLibro = libro._id;
    let nombreLibro = libro.titulo;
    let idUsuario = this.usuario?._id;
    //fecha inicio
    //fecha fin
    let data = {"idLibro": idLibro, "idUsuario": idUsuario, "nombreLibro": nombreLibro};
    this.libroService.borrowBook(data).subscribe( //aca ya le envio el data
      response => {
        console.log('Book borrowed successfully:', response);
        this.snackBar.open('Libro prestado exitosamente', 'Cerrar', {
          duration: 500,
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/lista-libros']); 
        });
      },
      error => {
        console.error('Error deleting book:', error);
        this.snackBar.open('Este libro no esta disponible', 'Cerrar', {
          duration: 500,
        })
      }
    );
  }
}
