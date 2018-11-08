import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairCapabilityComponent } from './repair-capability.component';

describe('RepairCapabilityComponent', () => {
  let component: RepairCapabilityComponent;
  let fixture: ComponentFixture<RepairCapabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairCapabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
