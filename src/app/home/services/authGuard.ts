import {ActivatedRouteSnapshot, createUrlTreeFromSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from './users/user.service';
import {map} from 'rxjs';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return inject(UserService).isUserAuthenticated$.pipe(
    map(isAuthenticated => isAuthenticated ? true : createUrlTreeFromSnapshot(next, ['/', 'home', 'login']))
  )
}
