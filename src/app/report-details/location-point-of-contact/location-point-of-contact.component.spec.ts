import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPointOfContactComponent } from './location-point-of-contact.component';

describe('LocationPointOfContactComponent', () => {
  let component: LocationPointOfContactComponent;
  let fixture: ComponentFixture<LocationPointOfContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPointOfContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPointOfContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
