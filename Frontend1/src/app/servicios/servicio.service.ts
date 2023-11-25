import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }
  obtenerLibros(){
    return this.http.get('') //Insertar URL del la importacion de Python
  }
}
