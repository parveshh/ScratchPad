import { Component, OnDestroy } from '@angular/core';
import { UserService } from "../services/UserService";
import { Observable, Subscription, Subject } from "rxjs";
import { Router } from "@angular/router";
import { NgRedux, select } from "@angular-redux/store/lib";
import { IAppState } from "../StateStore/Store";
import { Actions } from "../StateStore/Actions/Actions";
import { BaseComponent } from "../sharedcomponents/BaseComponent";

@Component({
    templateUrl: "./login.html",
    selector: 'login'


})

export class LoginComponent extends BaseComponent {

    public error: Subject<string> = new Subject<string>();
    public email: string = '';
    public password: string = '';

    @select((store: IAppState) => store.user) loggedInUser: Observable<any>;

    constructor(private userService: UserService, private router: Router,
        private ngRedux: NgRedux<IAppState>) {
        super();

       
        this.loggedInUser.subscribe(this.loggedIn);

    }

    private loggedIn = (user: any) => {

        if (user !== null) {
            this.router.navigate(['/home']);
        }
    }

    onLogin(): void {

        this.error.next('');
        this.userService.Authenticate({ 'email': this.email, 'password': this.password }).then(
            (success) => {
                this.userService.GetDetails(success).subscribe((success) => {
                    this.ngRedux.dispatch({ type: Actions.USER_AUTHENTICATED, payload: success.Details });
                }, (error) => {
                    throw error;
                });
            },
            (error) => { this.error.next(error.message) });
    }

}