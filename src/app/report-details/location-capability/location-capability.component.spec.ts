import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCapabilityComponent } from './location-capability.component';

describe('LocationCapabilityComponent', () => {
  let component: LocationCapabilityComponent;
  let fixture: ComponentFixture<LocationCapabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationCapabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
