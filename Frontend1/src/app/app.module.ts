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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

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
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
