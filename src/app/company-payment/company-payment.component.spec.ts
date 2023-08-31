import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPaymentComponent } from './company-payment.component';

describe('CompanyPaymentComponent', () => {
  let component: CompanyPaymentComponent;
  let fixture: ComponentFixture<CompanyPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyPaymentComponent]
    });
    fixture = TestBed.createComponent(CompanyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
