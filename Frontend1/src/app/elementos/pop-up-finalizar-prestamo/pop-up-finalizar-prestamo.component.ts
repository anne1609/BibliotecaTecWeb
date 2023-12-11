import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicioService } from '../../servicios/servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-finalizar-prestamo',
  templateUrl: './pop-up-finalizar-prestamo.component.html',
  styleUrl: './pop-up-finalizar-prestamo.component.css'
})
export class PopUpFinalizarPrestamoComponent {
  @Inject(MAT_DIALOG_DATA) id_prestamo: any
  constructor(
    public dialogRef: MatDialogRef<PopUpFinalizarPrestamoComponent>,
    private servicio:ServicioService,
    private route:Router
  ) {}

  onClose(): void {
    this.dialogRef.close();
    this.servicio.cambiarEstado(this.id_prestamo)
    this.route.navigate(
      ["/producto"])
  }

}
