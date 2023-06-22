import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRansomComponent } from './create-ransom.component';

describe('CreateRansomComponent', () => {
  let component: CreateRansomComponent;
  let fixture: ComponentFixture<CreateRansomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRansomComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRansomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
