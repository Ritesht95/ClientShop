import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlladressesComponent } from './alladresses.component';

describe('AlladressesComponent', () => {
  let component: AlladressesComponent;
  let fixture: ComponentFixture<AlladressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlladressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlladressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
