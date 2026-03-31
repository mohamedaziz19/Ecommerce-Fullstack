import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = this.decodeToken(token);
      if (decodedToken.role === 'admin') {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
}
