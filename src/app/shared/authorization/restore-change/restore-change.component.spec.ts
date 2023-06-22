import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreChangeComponent } from './restore-change.component';

describe('RestoreChangeComponent', () => {
  let component: RestoreChangeComponent;
  let fixture: ComponentFixture<RestoreChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestoreChangeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RestoreChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
