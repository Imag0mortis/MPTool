import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RansomCardComponent } from './ransom-card.component';

describe('RansomCardComponent', () => {
  let component: RansomCardComponent;
  let fixture: ComponentFixture<RansomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RansomCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RansomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
