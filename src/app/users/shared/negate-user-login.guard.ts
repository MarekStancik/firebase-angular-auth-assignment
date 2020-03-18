import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserGuard } from './user.guard';

@Injectable({
  providedIn: 'root'
})
export class NegateUserLoginGuard implements CanActivate {

  constructor(private _userLoggedInGuard: UserGuard) {}

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return !this._userLoggedInGuard.canActivate(route,state);
  }
}
