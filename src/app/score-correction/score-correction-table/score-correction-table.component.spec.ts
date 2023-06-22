import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCorrectionTableComponent } from './score-correction-table.component';

describe('ScoreCorrectionTableComponent', () => {
  let component: ScoreCorrectionTableComponent;
  let fixture: ComponentFixture<ScoreCorrectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreCorrectionTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreCorrectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
