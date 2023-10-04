import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZpComponent } from './zp.component';

describe('ZpComponent', () => {
  let component: ZpComponent;
  let fixture: ComponentFixture<ZpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZpComponent]
    });
    fixture = TestBed.createComponent(ZpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
