import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadProgramaComponent } from './actividad-programa.component';

describe('ActividadProgramaComponent', () => {
  let component: ActividadProgramaComponent;
  let fixture: ComponentFixture<ActividadProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
