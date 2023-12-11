import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicioService } from '../../servicios/servicio.service';

@Component({
  selector: 'app-pop-up-finalizar-prestamo',
  templateUrl: './pop-up-finalizar-prestamo.component.html',
  styleUrl: './pop-up-finalizar-prestamo.component.css'
})
export class PopUpFinalizarPrestamoComponent {
  constructor(
    public dialogRef: MatDialogRef<PopUpFinalizarPrestamoComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

}
