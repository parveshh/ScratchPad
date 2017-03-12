import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFire } from 'angularfire2';
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../StateStore/Store";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Actions } from "../StateStore/Actions/Actions";

@Injectable()
export class AuthService implements CanActivate {

    constructor(private af: AngularFire, private ngRedux: NgRedux<IAppState>, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        return this.af.auth.map((auth) => {
            if (!auth) {
                this.router.navigate(['/login']);
                return false;
            }
            this.ngRedux.dispatch({ type: Actions.USER_AUTHENTICATED, payload: auth.auth })
            return true;
        }).take(1);
    }



}