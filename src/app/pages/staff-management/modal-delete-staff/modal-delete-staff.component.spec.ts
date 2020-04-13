import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteStaffComponent } from './modal-delete-staff.component';

describe('ModalDeleteStaffComponent', () => {
  let component: ModalDeleteStaffComponent;
  let fixture: ComponentFixture<ModalDeleteStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
