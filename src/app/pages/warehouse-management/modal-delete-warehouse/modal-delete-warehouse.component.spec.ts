import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteWarehouseComponent } from './modal-delete-warehouse.component';

describe('ModalDeleteWarehouseComponent', () => {
  let component: ModalDeleteWarehouseComponent;
  let fixture: ComponentFixture<ModalDeleteWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
