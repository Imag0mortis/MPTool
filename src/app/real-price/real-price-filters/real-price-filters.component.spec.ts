import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealPriceFiltersComponent } from './real-price-filters.component';

describe('RealPriceFiltersComponent', () => {
  let component: RealPriceFiltersComponent;
  let fixture: ComponentFixture<RealPriceFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealPriceFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealPriceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
