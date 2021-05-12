import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarEmpleadoComponent } from './modal-eliminar-empleado.component';

describe('ModalEliminarEmpleadoComponent', () => {
  let component: ModalEliminarEmpleadoComponent;
  let fixture: ComponentFixture<ModalEliminarEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEliminarEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
