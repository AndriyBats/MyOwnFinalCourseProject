import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.isUserLogin();
  }

  isUserLogin(): boolean {
    if(localStorage.length > 0 && localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user') as string);
      if(user && user.role === 'USER'){
        return true
      }else {
        return false
      }
    }else{
      return false
    }
  }
  
}
