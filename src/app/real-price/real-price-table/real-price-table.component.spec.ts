import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealPriceTableComponent } from './real-price-table.component';

describe('RealPriceTableComponent', () => {
  let component: RealPriceTableComponent;
  let fixture: ComponentFixture<RealPriceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealPriceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealPriceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
