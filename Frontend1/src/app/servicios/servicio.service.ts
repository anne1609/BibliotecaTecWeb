import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl ='/api/books';
  constructor(private http: HttpClient) { }
  obtenerLibros(){
    return this.http.get(this.apiUrl);
  }

  obtenerLibro(id: number){
    const url = `/libro/${id}`;
    return this.http.get(url);
  }
  addBook(bookData: any): Observable<any> {
    return this.http.post('/api/books', bookData);
  }
  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(`/apiDelete/${bookId}`);
  }
  
  
  editar(id:any, libro:any):Observable<any>{
    return this.http.put(`/editar/${id}`,libro);
  }

  obtenerLibrosPorCategoria(categoria: string){
    return this.http.get(`/category/${categoria}`); 
  }

  obtenerCategorias(){
    return this.http.get('/libro/categories');
  }
  borrowBook(data:any){
    return this.http.post('/api/borrow', data);

  }
  //Users
  addUserLector(userData: any): Observable<any> {
    console.log("ESTOY AQUI");
    return this.http.post('/api/users', userData);
  }
  addUserAuthor(userData: any): Observable<any> {
    console.log("ESTOY AQUI");
    return this.http.post('/api/authors', userData);
  }
  loginUser(userData: any): Observable<any>{
    return this.http.post('/api/login', userData);
  }
  registrarPrestamo(prestamoData: any): Observable<any>{
    return this.http.post('/api/borrow', prestamoData);
  }
  obtenerPrestamosDeUsuario(userId: string): Observable<any> {
    return this.http.get(`/loansUser/${userId}`);
  }
  obtenerPrestamos(): Observable<any> {
    return this.http.get(`/api/loans`);
  }
}