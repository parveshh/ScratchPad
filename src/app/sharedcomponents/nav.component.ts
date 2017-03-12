import { Component } from "@angular/core";
import { UserService } from "../services/UserService";
import { Subject, Subscription } from "rxjs";
import { NgRedux, select } from "@angular-redux/store/lib";
import { IAppState } from "../StateStore/Store";
import { Observable } from "rxjs/Observable";
import { BaseComponent } from "./BaseComponent";
import { Router } from "@angular/router";
import { Actions } from "../StateStore/Actions/Actions";
@Component({
    selector: 'navbar',
    templateUrl: '../shared/navbar.html'

})


export class NavComponent extends BaseComponent {
    public loggedIn: boolean = false;
    @select((state: IAppState) => state.user) currentUser: Observable<any>;
    constructor(private router: Router, userService: UserService, ngRedux: NgRedux<IAppState>) {
        super();
        this.currentUser.subscribe(this.getUser);
        // userService.getAuth().subscribe((response) => {

        //     ngRedux.dispatch({ type: Actions.USER_AUTHENTICATED, payload: response.auth });
        // });



    }

    private getUser = (user: any) => {
        if (user !== null) {

            this.loggedIn = true;
        }
    }


}