import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRestaurantComponent } from './detalle-restaurant.component';

describe('DetalleRestaurantComponent', () => {
  let component: DetalleRestaurantComponent;
  let fixture: ComponentFixture<DetalleRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
