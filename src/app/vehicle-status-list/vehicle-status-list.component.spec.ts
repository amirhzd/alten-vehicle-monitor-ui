import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleStatusListComponent } from './vehicle-status-list.component';

describe('VehicleStatusListComponent', () => {
  let component: VehicleStatusListComponent;
  let fixture: ComponentFixture<VehicleStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
