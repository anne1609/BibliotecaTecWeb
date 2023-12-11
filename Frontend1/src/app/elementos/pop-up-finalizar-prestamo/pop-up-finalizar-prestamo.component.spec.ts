import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpFinalizarPrestamoComponent } from './pop-up-finalizar-prestamo.component';

describe('PopUpFinalizarPrestamoComponent', () => {
  let component: PopUpFinalizarPrestamoComponent;
  let fixture: ComponentFixture<PopUpFinalizarPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpFinalizarPrestamoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpFinalizarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
