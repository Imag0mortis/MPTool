import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RansomCalculationFiltersComponent } from './ransom-calculation-filters.component';

describe('RansomCalculationFiltersComponent', () => {
  let component: RansomCalculationFiltersComponent;
  let fixture: ComponentFixture<RansomCalculationFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RansomCalculationFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RansomCalculationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
