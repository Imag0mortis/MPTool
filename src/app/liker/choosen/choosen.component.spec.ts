import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosenComponent } from './choosen.component';

describe('ChoosenComponent', () => {
  let component: ChoosenComponent;
  let fixture: ComponentFixture<ChoosenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoosenComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
