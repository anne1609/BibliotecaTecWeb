import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface InformacionTarjeta {
  numero: string;
  fechaVencimiento: string;
  codigoSeguridad: string;
}

export interface User {
  _id: string;
  nombre: string;
  correo: string;
  informacionTarjeta: InformacionTarjeta;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() {}

  setUser(user: User) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  getCurrentUser() {
    return this.userSubject.value;
  }

  clearUser() {
    this.userSubject.next(null);
  }

  // ... otros métodos relacionados con el usuario
}
