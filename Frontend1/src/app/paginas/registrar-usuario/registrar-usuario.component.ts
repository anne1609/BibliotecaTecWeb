import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioService } from '../../servicios/servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common'; // Import Location
import { DatePipe } from '@angular/common'; // Import DatePipe
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrarUsuarioComponent {
  constructor(
    private service: ServicioService, 
    private snackBar: MatSnackBar, 
    private location: Location, 
    private datePipe: DatePipe,   
    private router: Router) { }

  userForm = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Correo: new FormControl('', [Validators.required, Validators.email]),
    Contrasenia: new FormControl('', Validators.required),
    NumeroTarjeta: new FormControl('', Validators.required),
    FechaTarjeta: new FormControl('', Validators.required),
    CodigoTarjeta: new FormControl('', Validators.required),
  });
  hide = true;

  get fullName() { return this.userForm.get('Nombre'); }
  get email() { return this.userForm.get('Correo'); }
  get password() { return this.userForm.get('Contrasenia'); }
  get cardNumber() { return this.userForm.get('NumeroTarjeta'); }
  get cardExpiryDate() { return this.userForm.get('FechaTarjeta'); }
  get cardSecurityCode() { return this.userForm.get('CodigoTarjeta'); }

  getFullNameErrorMessage() {
    if (this.fullName?.hasError('required')) {
      return 'Debes ingresar un nombre completo';
    }
    return '';
  }

  getCardNumberErrorMessage() {
    if (this.cardNumber?.hasError('required')) {
      return 'Debes ingresar un número de tarjeta correcto';
    }
    return '';
  }

  getCardExpiryDateErrorMessage() {
    if (this.cardExpiryDate?.hasError('required')) {
      return 'Ingresa una fecha de caducidad';
    }
    return '';
  }

  getCardSecurityCodeErrorMessage() {
    if (this.cardSecurityCode?.hasError('required')) {
      return 'Ingresa un código';
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
  
    const userData = this.userForm.value;
    this.service.addUserLector(userData).subscribe(
      response => {
        console.log('User added successfully:', response);
        this.userForm.reset();
        this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
          duration: 500,
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
