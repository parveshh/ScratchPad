import { AngularFire, FirebaseAuthState, FirebaseListObservable, AuthMethods, AuthProviders, FirebaseObjectObservable, AngularFireAuth } from 'angularfire2';
import { User } from "../models/usermodel";
import { Injectable } from "@angular/core";
import { RegisterModel } from "../models/resgitermodel";
import { Thenable } from "firebase";
import { BaseService } from "./BaseService";
import { AuthConfiguration } from "angularfire2/auth";
import { ExpenseModel } from "../models/expensemodel";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService extends BaseService {

    private _database: AngularFire;

    constructor(database: AngularFire) {
        super();
        this._database = database;
    }

    public createUser(user: RegisterModel): Thenable<FirebaseAuthState> {

        return this._database.auth.createUser({
            email: user.email,
            password: user.password
        }).catch(this.onError);

    }

    public CreateExpense(expense: ExpenseModel): Thenable<any> {

        var currentUser = this._database.auth.getAuth().auth.uid;

        var currentDate = Date.parse(expense.when);


        var expenseObject = this._database.database.list("/expense/" + currentUser + "/" + currentDate);

        this.log(currentDate);

        return expenseObject.push(expense).catch(this.onError);


    }

    public RegisterUser(id: string, user: RegisterModel): Thenable<any> {


        var users: FirebaseObjectObservable<RegisterModel> =
            this._database.database.object("/users/" + id);
        user.userId = id;
        return users.set({ "Details": user }).catch(this.onError);

    }

    public Authenticate(loginDetails: { email: string, password: string }): Thenable<FirebaseAuthState> {

        var config: AuthConfiguration = {
            method: AuthMethods.Password, provider: AuthProviders.Password
        };
        return this._database.auth.login(loginDetails, config).catch(this.onError);
    };

    public GetDetails(auth: FirebaseAuthState): FirebaseObjectObservable<any> {
        return this._database.database.object("/users/" + auth.uid);
    }

    public getOnlineUsers(callback: (snapshot, val?: string) => void) {

        return this._database.database.list('.info/connected').$ref.ref.on('value', callback);

    }

    public getAuth(): Observable<FirebaseAuthState> {
        return this._database.auth.asObservable();
    }

}
