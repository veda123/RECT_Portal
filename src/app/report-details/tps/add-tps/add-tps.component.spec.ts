import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTpsComponent } from './add-tps.component';

describe('AddTpsComponent', () => {
  let component: AddTpsComponent;
  let fixture: ComponentFixture<AddTpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
