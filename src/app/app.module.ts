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
import { HomeComponent } from "./home/home.component";
import { SidebarComponent } from "./home/sections/sidebar.component";
import { PadService } from "./services/PadService";
import { AuthService } from "./services/AuthService";
import { ContentComponent } from "./home/sections/content.component";

export const firebaseConfig = {
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
        NavComponent, RegisterComponent, HomeComponent, SidebarComponent,ContentComponent],
    bootstrap: [AppComponent],
    providers: [UserService, PadService, AuthService]


})

export class AppModule {

    constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
        ngRedux.configureStore(rootReducer, InitialState, [], [devTools.enhancer()]);
    }
}
