import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBillComponent } from './export-bill.component';

describe('ExportBillComponent', () => {
  let component: ExportBillComponent;
  let fixture: ComponentFixture<ExportBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
