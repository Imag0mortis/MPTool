import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfransomComponent } from './selfransom.component';

describe('SelfransomComponent', () => {
  let component: SelfransomComponent;
  let fixture: ComponentFixture<SelfransomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfransomComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfransomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
