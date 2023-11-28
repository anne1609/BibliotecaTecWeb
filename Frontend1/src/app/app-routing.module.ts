import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarLibroComponent } from './paginas/registrar-libro/registrar-libro.component';
import { LibrosComponent } from './paginas/libros/libros.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ListaLibrosComponent } from './paginas/lista-libros/lista-libros.component'
import { LibroComponent } from './elementos/libro/libro.component';
import { EditarLibroComponent } from './elementos/editar-libro/editar-libro.component';


const routes: Routes = [
  { path: 'registrar-libro', component: RegistrarLibroComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'lista-libros', component: ListaLibrosComponent },
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'editar-libro/:id', component: EditarLibroComponent },
  { path: 'lista-libros/:id', component: LibroComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
