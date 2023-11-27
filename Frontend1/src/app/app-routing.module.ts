import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarLibroComponent } from './paginas/registrar-libro/registrar-libro.component';


const routes: Routes = [
  { path: 'registrar-libro', component: RegistrarLibroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
