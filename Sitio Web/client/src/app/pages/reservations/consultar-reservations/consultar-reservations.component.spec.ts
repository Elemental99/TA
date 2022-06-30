import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarReservationsComponent } from './consultar-reservations.component';

describe('ConsultarReservationsComponent', () => {
  let component: ConsultarReservationsComponent;
  let fixture: ComponentFixture<ConsultarReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
