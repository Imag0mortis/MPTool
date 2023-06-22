import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RansomCalculationTableComponent } from './ransom-calculation-table.component';

describe('RansomCalculationTableComponent', () => {
  let component: RansomCalculationTableComponent;
  let fixture: ComponentFixture<RansomCalculationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RansomCalculationTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RansomCalculationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
