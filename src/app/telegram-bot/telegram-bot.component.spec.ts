import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramBotComponent } from './telegram-bot.component';

describe('TelegramBotComponent', () => {
  let component: TelegramBotComponent;
  let fixture: ComponentFixture<TelegramBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelegramBotComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TelegramBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
