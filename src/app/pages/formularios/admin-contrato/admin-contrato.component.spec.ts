import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContratoComponent } from './admin-contrato.component';

describe('AdminContratoComponent', () => {
  let component: AdminContratoComponent;
  let fixture: ComponentFixture<AdminContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
