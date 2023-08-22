import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { GuideModalService } from './guidemodal.service';

@Component({
  selector: 'app-guidemodal',
  templateUrl: './guidemodal.component.html',
  styleUrls: ['./guidemodal.component.scss']
})
export class GuidemodalComponent implements OnInit {
  constructor(
    public appService: AppService,
    private router: Router,
    private modalService: GuideModalService
  ) {}

  ngOnInit(): void {}

  goInstallApi() {
    this.router.navigate(['/feedback-token']);
    this.modalService.modalClosed.next(true);
  }
}
