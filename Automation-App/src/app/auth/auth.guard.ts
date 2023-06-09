import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, take, switchMap, map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userIsAuthenticated.pipe(
        take(1),
        switchMap(isAuthenticated => {
          if(!isAuthenticated) {
            return this.authService.autoLogin();
          } else {
            return of(isAuthenticated);
          }
        }),
        map(isAuthenticated => {
            if(route.path && route.path == 'auth') {
              if(isAuthenticated) {
                this.router.navigateByUrl('/dashboard/monitoring');
                return false;
              }
              return true;
            }
            
            if(!isAuthenticated) {
              this.router.navigateByUrl('/auth');
              return false;
            } else {
              return true;
            }
        })
    );
  }
}
