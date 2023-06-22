import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefsystemComponent } from './refsystem.component';

describe('RefsystemComponent', () => {
  let component: RefsystemComponent;
  let fixture: ComponentFixture<RefsystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefsystemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RefsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
