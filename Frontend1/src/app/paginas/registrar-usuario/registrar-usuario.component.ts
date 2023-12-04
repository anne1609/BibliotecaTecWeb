
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrarUsuarioComponent {
  hide = true;
  fullName = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  getFullNameErrorMessage() {
    if (this.fullName.hasError('required')) {
      return 'Debes ingresar un nombre completo';
    }

    return '';
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'No es un correo electrónico válido' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Debes ingresar una contraseña';
    }

    return '';
  }
}