import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserServiceService } from './servicios/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Frontend1';
  usuarioAutenticado: boolean = false;
  tipoUsuario: string | null = null;
  private userSubscription: Subscription = new Subscription;

  constructor(private userService: UserServiceService) {}

  ngOnInit() {
    this.userSubscription = this.userService.getUser().subscribe((user: User | null | string) => {
      let userObj: User | null = null;
  
      if (typeof user === 'string') {
        userObj = JSON.parse(user);
      } else {
        userObj = user;
      }
      if (userObj) {
        console.log("Tipo de usuario:", userObj.tipo);
        this.tipoUsuario = userObj.tipo;
        this.usuarioAutenticado = true;
      } else {
        this.usuarioAutenticado = false;
      }
    });
  }
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
