import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotModalComponent } from './bot-modal.component';

describe('BotModalComponent', () => {
  let component: BotModalComponent;
  let fixture: ComponentFixture<BotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
