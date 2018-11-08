import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationPocComponent } from './add-location-poc.component';

describe('AddLocationPocComponent', () => {
  let component: AddLocationPocComponent;
  let fixture: ComponentFixture<AddLocationPocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocationPocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
