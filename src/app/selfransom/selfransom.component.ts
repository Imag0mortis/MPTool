import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2
} from '@angular/core';
import { SelfransomService } from '../shared/services/selfransom.service';
import { RequestService } from '../shared/services/request.service';
import { AppService } from '../shared/services/app.service';

@Component({
  selector: 'app-selfransom',
  templateUrl: './selfransom.component.html',
  styleUrls: ['./selfransom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelfransomComponent implements OnInit {
  
  userId: string;

  constructor(private selfransomService: SelfransomService,
    private appService: AppService,
    private requestService: RequestService,
    private ref: ChangeDetectorRef,
    ) {}

  async ngOnInit(): Promise <void> {
    this.selfransomService.getUserGeoLocation();
    this.appService.init();
    await this.getData();
    await this.loadUsetifulScript(this.userId);
    setTimeout(() => {
      console.log('Айдишник', this.userId)
    }, 5000);
    this.ref.detectChanges();
  }

  private loadUsetifulScript(userId: string): void {
    const usetifulTags = { userId };
    

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.usetiful.com/dist/usetiful.js';
    script.setAttribute('id', 'usetifulScript');
    script.dataset['token'] = 'ff8f5b44ca52aed9b607ddfd7484bcac';

    script.textContent = `window.usetifulTags = ${JSON.stringify(usetifulTags)};`;

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
  }

  getData() {
    this.requestService.getUserInfo().subscribe((r: any) => {
      this.userId = r.userId;
    });
  }
}
