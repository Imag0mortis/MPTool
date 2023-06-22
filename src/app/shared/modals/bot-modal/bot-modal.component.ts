import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { RequestService } from '../../services/request.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AppService } from 'src/app/shared/services/app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bot-modal',
  templateUrl: './bot-modal.component.html',
  styleUrls: ['./bot-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotModalComponent implements OnInit {
  link = '';
  popupActive: boolean;
  linkinfo: any;

  linkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public appService: AppService,
    private request: RequestService,
    private ref: ChangeDetectorRef
  ) {
    this.linkForm = fb.group({
      linkInput: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getData();
    this.generateLink('someType');
    console.log('код', this.link);
  }

  generateLink(type: string) {
    this.request.createTgLink(type).subscribe((response: any) => {
      this.link = response.tglink;
      this.ref.detectChanges();

      this.linkForm.get('linkInput')?.setValue(this.link);

      console.log('код', this.link);
    });
  }

  test() {
    console.log('окно', this.popupActive);
    console.log('код', this.link);
  }

  getData() {
    this.request.getUserInfo().subscribe((r: any) => {
      this.linkinfo = r.links.map((links: any) => {
        return {
          link: links.is_push_tg_enabled
        };
      });
    });
  }
}
