import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  constructor(private http: HttpClient) { }
  obtenerLibros(){
    return this.http.get('/api/books');
  }
  addBook(bookData: any): Observable<any> {
    return this.http.post('/api/books', bookData);
  }
  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(`/apiDelete/${bookId}`);
  }
  
}
