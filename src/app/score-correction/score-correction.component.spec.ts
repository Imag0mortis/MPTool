import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCorrectionComponent } from './score-correction.component';

describe('ScoreCorrectionComponent', () => {
  let component: ScoreCorrectionComponent;
  let fixture: ComponentFixture<ScoreCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreCorrectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
