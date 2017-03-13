import { RegisterModel } from "../../app/models/resgitermodel";
import { Thenable } from "firebase";
import { FirebaseAuthState, AuthProviders } from "angularfire2";
import { Observable } from "rxjs/Observable";

export class AngularfireMock {

    auth = {

        createUser : (user: RegisterModel): Thenable<FirebaseAuthState> => {


            return new Promise<FirebaseAuthState>((resolve, reject) => {
                var fireauthState = new FirebaseAuthStateMock()
                fireauthState.uid = 'xvbctyhsfdgtlsgdhd';
                resolve(fireauthState);
            });
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


