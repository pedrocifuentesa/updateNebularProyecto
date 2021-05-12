import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearContratoComponent } from './modal-crear-contrato.component';

describe('ModalCrearContratoComponent', () => {
  let component: ModalCrearContratoComponent;
  let fixture: ComponentFixture<ModalCrearContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
