import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-guidemodal',
  templateUrl: './guidemodal.component.html',
  styleUrls: ['./guidemodal.component.scss']
})
export class GuidemodalComponent implements OnInit {

  @ViewChild('modal') modal:ElementRef;

  constructor(
    public appService: AppService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goInstallApi() {
    this.router.navigate(['/token']);
    this.modal.nativeElement.setAttribute('close', '');
  }
}
