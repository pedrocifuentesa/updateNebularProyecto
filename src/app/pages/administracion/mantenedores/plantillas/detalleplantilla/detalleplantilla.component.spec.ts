import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleplantillaComponent } from './detalleplantilla.component';

describe('DetalleplantillaComponent', () => {
  let component: DetalleplantillaComponent;
  let fixture: ComponentFixture<DetalleplantillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleplantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleplantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
