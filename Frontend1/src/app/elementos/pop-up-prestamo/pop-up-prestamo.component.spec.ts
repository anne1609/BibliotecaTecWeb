import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPrestamoComponent } from './pop-up-prestamo.component';

describe('PopUpPrestamoComponent', () => {
  let component: PopUpPrestamoComponent;
  let fixture: ComponentFixture<PopUpPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpPrestamoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
