import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdministrarCuadrillaComponent } from './modal-administrar-cuadrilla.component';

describe('ModalAdministrarCuadrillaComponent', () => {
  let component: ModalAdministrarCuadrillaComponent;
  let fixture: ComponentFixture<ModalAdministrarCuadrillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdministrarCuadrillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdministrarCuadrillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
