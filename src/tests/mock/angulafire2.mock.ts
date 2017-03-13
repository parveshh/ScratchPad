import { RegisterModel } from "../../app/models/resgitermodel";
import { Thenable } from "firebase";
import { FirebaseAuthState, AuthProviders } from "angularfire2";
import { Observable } from "rxjs/Observable";

export module AngularfireMock {

    export class database {

    }

    export class auth {

        createUser = (user: RegisterModel): Thenable<FirebaseAuthState> => {

            var fireauthState = new FirebaseAuthStateMock()
            fireauthState.uid = 'xvbctyhsfdgtlsgdhd';
            return new Promise<FirebaseAuthState>(() => fireauthState);
        }
    }

}

export class FirebaseAuthStateMock implements FirebaseAuthState {
    uid: string;
    provider: AuthProviders;
    auth: firebase.User;
    expires: number;
    github: firebase.UserInfo;
    google: firebase.UserInfo;
    twitter: firebase.UserInfo;
    facebook: firebase.UserInfo;
    anonymous: boolean;
}


