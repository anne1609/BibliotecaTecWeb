import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarLibroComponent } from './paginas/registrar-libro/registrar-libro.component';
import { LibrosComponent } from './paginas/libros/libros.component';
import { ListaLibrosComponent } from './paginas/lista-libros/lista-libros.component'
import { LibroComponent } from './elementos/libro/libro.component';
import { EditarLibroComponent } from './elementos/editar-libro/editar-libro.component';
import { InicioSesionComponent } from './paginas/inicio-sesion/inicio-sesion.component';
import { RegistrarUsuarioComponent } from './paginas/registrar-usuario/registrar-usuario.component';
import { RegistrarAutorComponent } from './paginas/registrar-autor/registrar-autor.component';
import { RegistrarComponent } from './paginas/registrar/registrar.component';

const routes: Routes = [
  { path: 'registrar-libro', component: RegistrarLibroComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'lista-libros', component: ListaLibrosComponent },
  { path: '', redirectTo: '/registrar', pathMatch: 'full' },
  { path: 'editar-libro/:id', component: EditarLibroComponent },
  { path: 'lista-libros/:id', component: LibroComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'registrar-autor', component: RegistrarAutorComponent },
  {path: 'registrar', component: RegistrarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }