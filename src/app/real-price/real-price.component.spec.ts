import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealPriceComponent } from './real-price.component';

describe('RealPriceComponent', () => {
  let component: RealPriceComponent;
  let fixture: ComponentFixture<RealPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
