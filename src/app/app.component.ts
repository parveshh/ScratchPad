import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/UserService";
import { User } from "./models/usermodel";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "./StateStore/Store";
@Component({

    selector: "app-root",
    template: '<router-outlet></router-outlet>',
    
    

})

export class AppComponent implements OnInit {
    public message: string;
    private _userService: UserService;
    constructor(userService: UserService) {
        this.message = "Hello World";
        this._userService = userService;
    }

    ngOnInit() {
        /* this._userService.createUser({ DisplayName: "Parvesh", EmailAddress: "Parvesh@gmail.com", Password: "123456xx", UserId: "" }).then((user) => {

        //     console.log(user);
         });*/
    }
}