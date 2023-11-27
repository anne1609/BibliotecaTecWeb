import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }
  obtenerLibros(){
    return this.http.get('https://bca1-190-104-9-145.ngrok-free.app/books') //Insertar URL del la importacion de Python
  }
}
