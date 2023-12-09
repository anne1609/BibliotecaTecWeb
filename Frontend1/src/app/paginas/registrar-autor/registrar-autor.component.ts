import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioService } from '../../servicios/servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-autor',
  templateUrl: './registrar-autor.component.html',
  styleUrls: ['./registrar-autor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrarAutorComponent {
  constructor(
    private service: ServicioService, 
    private snackBar: MatSnackBar, 
    private location: Location, 
    private datePipe: DatePipe,
    private router: Router
    ) { }

  authorForm = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Correo: new FormControl('', [Validators.required, Validators.email]),
    Contrasenia: new FormControl('', Validators.required),
    DireccionOficina: new FormControl('', Validators.required),
    NumeroCuentaBanco: new FormControl('', Validators.required),
  });
  hide = true;

  get fullName() { return this.authorForm.get('Nombre'); }
  get email() { return this.authorForm.get('Correo'); }
  get password() { return this.authorForm.get('Contrasenia'); }
  get workPlace() { return this.authorForm.get('DireccionOficina'); }
  get bankAccount() { return this.authorForm.get('NumeroCuentaBanco'); }

  getFullNameErrorMessage() {
    if (this.fullName?.hasError('required')) {
      return 'Debes ingresar un nombre completo';
    }
    return '';
  }

  getBankAccountErrorMessage() {
    if (this.bankAccount?.hasError('required')) {
      return 'Debes ingresar un número de tarjeta correcto';
    }
    return '';
  }

  getWorkPlaceErrorMessage() {
    if (this.workPlace?.hasError('required')) {
      return 'Ingresa una fecha de caducidad';
    }
    return '';
  }

  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    return this.email?.hasError('email') ? 'No es un correo electrónico válido' : '';
  }

  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Debes ingresar una contraseña';
    }
    return '';
  }
  onSubmit() {
  
    const authorData = this.authorForm.value;
    this.service.addUserAuthor(authorData).subscribe(
      response => {
        console.log('User added successfully:', response);
        this.authorForm.reset();
        this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/inicio-sesion']); 
        });
      },
      error => {
        console.error('Error adding User:', error);
      }
    );
  }

}
