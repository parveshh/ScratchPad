
import { BaseService } from "./BaseService";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState } from "angularfire2";
import { ScratchPad } from "../models/scratchpad";
import { Thenable } from "firebase";
import { Injectable } from "@angular/core";
@Injectable()
export class PadService extends BaseService {

    
    private _database: AngularFire;

    constructor(af: AngularFire) {
        super();
        this._database = af;
      
    }

    getScratchPads(userId:string): FirebaseListObservable<ScratchPad[]> {
       
        return <FirebaseListObservable<ScratchPad[]>>this._database.database.list("/pads/" + userId);
    }

    createPad(pad: ScratchPad,userId:string): Thenable<any> {
     
        var list = this._database.database.list("/pads/" + userId);
        return list.push(pad);
    }
}