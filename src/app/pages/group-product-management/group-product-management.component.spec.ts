import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProductManagementComponent } from './group-product-management.component';

describe('GroupProductManagementComponent', () => {
  let component: GroupProductManagementComponent;
  let fixture: ComponentFixture<GroupProductManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupProductManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
