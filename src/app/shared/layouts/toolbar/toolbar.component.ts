import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public appService: AppService,
    public authService: AuthService
  ) { }

  open = false;
 
    onClick(): void {
        this.open = !this.open;
    }
 
    onObscured(obscured: any): void {
        if (obscured) {
            this.open = false;
        }
    }
 
    onActiveZone(active: any): void {
        this.open = active && this.open;
    }


  ngOnInit(): void {
  }

}
