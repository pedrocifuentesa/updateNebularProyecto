import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoAreaComponent } from './contrato-area.component';

describe('ContratoAreaComponent', () => {
  let component: ContratoAreaComponent;
  let fixture: ComponentFixture<ContratoAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
