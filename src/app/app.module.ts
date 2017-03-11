import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "angularfire2";
import { UserService } from "./services/UserService";
import { NgReduxModule, NgRedux, DevToolsExtension } from "@angular-redux/store";
import { RouterModule, Router } from '@angular/router';
import { RouteConfig } from "./app.routes";
import { LoginComponent } from "./login/login.component";
import { NavComponent } from "./sharedcomponents/nav.component";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { IAppState, rootReducer, InitialState } from "./StateStore/Store";
import { userReducer } from "./StateStore/Reducers/UsersReducer";
import { HomeComponent } from "./home/home.component";

export const firebaseConfig = {
    apiKey: "AIzaSyCCE6cIsKJC_4W3ruFMEGMVz93nCXI15iw",
    authDomain: "logsreader-3a436.firebaseapp.com",
    databaseURL: "https://logsreader-3a436.firebaseio.com",
    storageBucket: "logsreader-3a436.appspot.com",
    messagingSenderId: "1009410504127"
};

@NgModule({
    imports: [BrowserModule,
        AngularFireModule.initializeApp(firebaseConfig),
        NgReduxModule,
        RouterModule.forRoot(RouteConfig.appRoutes),
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [AppComponent, LoginComponent,
        NavComponent, RegisterComponent, HomeComponent],
    bootstrap: [AppComponent],
    providers: [UserService]


})

export class AppModule {

    constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
        ngRedux.configureStore(rootReducer, InitialState, [], [devTools.enhancer()]);
    }
}
