import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetSetupComponent } from './cabinet-setup.component';

describe('CabinetSetupComponent', () => {
  let component: CabinetSetupComponent;
  let fixture: ComponentFixture<CabinetSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CabinetSetupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CabinetSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
