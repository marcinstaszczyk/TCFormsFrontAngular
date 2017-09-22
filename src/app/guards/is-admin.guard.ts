import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let isAdmin = this.userService.isAdmin()
    if (typeof isAdmin === 'boolean') {
      this.router.navigate(['/login']);
      return isAdmin;
    } else {
      return (<Observable<boolean>>isAdmin).do(
        boolean => { this._navigateToLogin(); }
      );
    }
  }

  private _navigateToLogin() {
    this.router.navigate(['/login']);
  }
}