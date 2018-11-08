import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationCapComponent } from './add-location-cap.component';

describe('AddLocationCapComponent', () => {
  let component: AddLocationCapComponent;
  let fixture: ComponentFixture<AddLocationCapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocationCapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
