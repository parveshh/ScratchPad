import { LoginComponent } from "./login/login.component";
import { AppComponent } from "./app.component";
import { Routes } from "@angular/router";
import { NavComponent } from './sharedcomponents/nav.component';
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { AuthService } from "./services/AuthService";

export class RouteConfig {
    public static appRoutes: Routes = [{
        path: '',
        component: LoginComponent,
        children: [
            { path: '', component: NavComponent, outlet: "navbar" }
        ]
    },
    {
        path: 'register',
        component: RegisterComponent,
        children: [
            { path: '', component: NavComponent, outlet: "navbar" }
        ]
    }, {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: '', component: NavComponent, outlet: "navbar" }
        ], canActivate: [AuthService]
    }
    ];
    constructor() { }

}