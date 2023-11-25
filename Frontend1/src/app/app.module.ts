import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibrosComponent } from './paginas/libros/libros.component';
import { RegistrarLibroComponent } from './paginas/registrar-libro/registrar-libro.component';
import { DetalleLibrosComponent } from './elementos/detalle-libros/detalle-libros.component';
import { LibroComponent } from './elementos/libro/libro.component';
import { EditarLibroComponent } from './elementos/editar-libro/editar-libro.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LibrosComponent,
    RegistrarLibroComponent,
    DetalleLibrosComponent,
    LibroComponent,
    EditarLibroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
