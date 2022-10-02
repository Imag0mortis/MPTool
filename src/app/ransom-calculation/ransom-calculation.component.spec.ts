import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RansomCalculationComponent } from './ransom-calculation.component';

describe('RansomCalculationComponent', () => {
  let component: RansomCalculationComponent;
  let fixture: ComponentFixture<RansomCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RansomCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RansomCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
