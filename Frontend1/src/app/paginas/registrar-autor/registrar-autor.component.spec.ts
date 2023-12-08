import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAutorComponent } from './registrar-autor.component';

describe('RegistrarAutorComponent', () => {
  let component: RegistrarAutorComponent;
  let fixture: ComponentFixture<RegistrarAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarAutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
