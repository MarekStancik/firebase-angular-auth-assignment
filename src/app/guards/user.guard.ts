import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad,CanActivate {

  constructor(private _auth: AuthService){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this._auth.getCurrentUser() != null;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this._auth.isLoggedIn();
  }
}
