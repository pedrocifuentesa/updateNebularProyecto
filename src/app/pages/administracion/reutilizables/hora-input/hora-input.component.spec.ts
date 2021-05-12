import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraInputComponent } from './hora-input.component';

describe('HoraInputComponent', () => {
  let component: HoraInputComponent;
  let fixture: ComponentFixture<HoraInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
