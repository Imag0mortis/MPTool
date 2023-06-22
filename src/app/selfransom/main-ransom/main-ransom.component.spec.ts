import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRansomComponent } from './main-ransom.component';

describe('MainRansomComponent', () => {
  let component: MainRansomComponent;
  let fixture: ComponentFixture<MainRansomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainRansomComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainRansomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
