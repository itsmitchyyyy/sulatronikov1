import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
    constructor(private router: Router) {}

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('currentUser')){
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    }
}