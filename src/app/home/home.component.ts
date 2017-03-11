
import { Component, EventEmitter, Output, Directive } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../StateStore/Store";
import { UserService } from "../services/UserService";
import { Subject } from "rxjs/Subject";
import { BaseComponent } from "../sharedcomponents/BaseComponent";
import { Actions, PresenceActions } from "../StateStore/Actions/Actions";

@Component({
    selector: "user-home",
    templateUrl: "./home.html",
    styleUrls:['./home.css']
})
export class HomeComponent extends BaseComponent {

    public error: Subject<string> = new Subject<string>();

    constructor(private ngRedux: NgRedux<IAppState>, private userService: UserService) {
        super();
    }

    ngOnInit(): void {
        this.userService.getOnlineUsers((dataSnapshot, b?: string) => {
            if (dataSnapshot.val()) {
                this.ngRedux.dispatch({ type: PresenceActions.USER_ONLINE, payload: true });

            } else {
                //Disconnected
                this.ngRedux.dispatch({ type: PresenceActions.USER_OFFLINE, payload: false });

            }

        });

       

        super.ngOnInit();
    }


}
