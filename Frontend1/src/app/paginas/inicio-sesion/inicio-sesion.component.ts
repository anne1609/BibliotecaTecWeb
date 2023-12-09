import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioService } from '../../servicios/servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InicioSesionComponent {
  constructor(
    private service: ServicioService, 
    private snackBar: MatSnackBar, 
    private location: Location, 
    private datePipe: DatePipe,
    private router: Router
    ) { }
  hide = true;
  loginForm = new FormGroup({
    Correo: new FormControl('', [Validators.required, Validators.email]),
    Contrasenia: new FormControl('', Validators.required)
  });
  get email() { return this.loginForm.get('Correo'); }
  get password() { return this.loginForm.get('Contrasenia'); }

  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    return this.email?.hasError('Correo') ? 'No es un correo electrónico válido' : '';
  }
  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Debes ingresar una contraseña';
    }
    return '';
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.service.loginUser(this.loginForm.value).subscribe(
        response => {
          console.log('Usuario inició sesión con éxito', response);
          this.loginForm.reset();
          this.snackBar.open('Login exitoso', 'Cerrar', {
          duration: 500,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/lista-libros']); 
          });
        },
        error => {
          console.error('Error en el inicio de sesión:', error);
        }
      );
    } else {
      console.log('El formulario es inválido');
    }
  }
  
}