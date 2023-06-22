import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private user: UserService) {}

  public logout() {
    this.user.userSubj$.next(undefined);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public successLogin(response: any) {
    localStorage.setItem('token', response.authorization);

    this.router.navigate(['/selfransom']);
  }
}
