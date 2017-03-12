import { ILogger } from "./ILogger";
import { Observable, Subject } from "rxjs";
import { Error } from "./Errors";
import { AngularFire, FirebaseAuthState } from "angularfire2";


export class BaseService implements ILogger {

    public messages: Subject<string>;
    public errorMessages: Subject<string>;
    private _emitErrors: boolean = true;
    protected User: FirebaseAuthState;
    constructor() {
              
    }



    onError = (error: any): void => {

        this.errorMessages.next(error.message || error);
        this.log(error);
        throw RangeError(error.message || error);

    };


    log = (message: any): void => {

        console.log(message);
    }
    settings = (config: any): void => {
        //Nothing here : TODO
    }




}