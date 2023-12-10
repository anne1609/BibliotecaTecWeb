import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pop-up-prestamo',
  templateUrl: './pop-up-prestamo.component.html',
  styleUrls: ['./pop-up-prestamo.component.css']
})
export class PopUpPrestamoComponent implements OnDestroy, OnInit {
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  dias: number = 0;
  costoPorDia: number = 5;
  cotizacion: number = 0;
  private subscriptions: Subscription[] = [];
  minDate: Date = new Date(); 

  constructor(public dialogRef: MatDialogRef<PopUpPrestamoComponent>) {
    this.subscribeToFormChanges();
  }
  ngOnInit(): void {
    this.calcularCotizacion();
    this.minDate = new Date();
  }

  private subscribeToFormChanges(): void {
    this.subscriptions.push(
      this.startDate.valueChanges.subscribe(() => {
        this.calcularCotizacion();
      }),
      this.endDate.valueChanges.subscribe(() => {
        this.calcularCotizacion();
      })
    );
  }

  calcularCotizacion(): void {
  const startDateValue = this.startDate.value;
  const endDateValue = this.endDate.value;

  if (startDateValue && endDateValue) {
    const start = new Date(startDateValue instanceof Date ? startDateValue : new Date(startDateValue));
    const end = new Date(endDateValue instanceof Date ? endDateValue : new Date(endDateValue));

    const diferenciaMs = Math.abs(end.getTime() - start.getTime());
    this.dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

    this.dias += 1;
    

    this.cotizacion = this.dias * this.costoPorDia;
  }
}


  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.startDate.value && this.endDate.value) {
      this.dialogRef.close({
        startDate: this.startDate.value.toISOString(),
        endDate: this.endDate.value.toISOString(),
        cotizacion: this.cotizacion,
        dias: this.dias
      });
    } 
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}



