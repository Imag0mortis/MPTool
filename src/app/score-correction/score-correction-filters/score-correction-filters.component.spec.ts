import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCorrectionFiltersComponent } from './score-correction-filters.component';

describe('ScoreCorrectionFiltersComponent', () => {
  let component: ScoreCorrectionFiltersComponent;
  let fixture: ComponentFixture<ScoreCorrectionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreCorrectionFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreCorrectionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
