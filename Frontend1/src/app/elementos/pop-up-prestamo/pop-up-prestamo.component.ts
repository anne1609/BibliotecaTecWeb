import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pop-up-prestamo',
  templateUrl: './pop-up-prestamo.component.html',
  styleUrl: './pop-up-prestamo.component.css'
})
export class PopUpPrestamoComponent {
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  constructor(public dialogRef: MatDialogRef<PopUpPrestamoComponent >) {}

  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {

    if (this.startDate.value && this.endDate.value) {
      this.dialogRef.close({
        startDate: this.startDate.value.toISOString(),
        endDate: this.endDate.value.toISOString()
      });
    } else {
      //solo en caso q sea null
    }
  }

}


