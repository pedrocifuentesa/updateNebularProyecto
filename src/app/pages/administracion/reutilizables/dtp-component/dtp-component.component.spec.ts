import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtpComponentComponent } from './dtp-component.component';

describe('DtpComponentComponent', () => {
  let component: DtpComponentComponent;
  let fixture: ComponentFixture<DtpComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtpComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtpComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
