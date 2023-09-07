import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private user: UserService) {}

  public logout(): void {
    this.user.userSubj$.next(undefined);
    localStorage.clear();
    window.location.reload();
  }
  

  public successLogin(response: any) {
    localStorage.setItem('token', response.authorization);

    this.router.navigate(['/selfransom']);
  }
}
