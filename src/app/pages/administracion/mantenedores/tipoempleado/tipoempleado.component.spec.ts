import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoempleadoComponent } from './tipoempleado.component';

describe('TipoempleadoComponent', () => {
  let component: TipoempleadoComponent;
  let fixture: ComponentFixture<TipoempleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoempleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
