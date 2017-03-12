
import { BaseService } from "./BaseService";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState } from "angularfire2";
import { ScratchPad } from "../models/scratchpad";
import { Thenable } from "firebase";
import { Injectable } from "@angular/core";
@Injectable()
export class PadService extends BaseService {

    private userId: string;
    private _database: AngularFire;

    constructor(af: AngularFire) {
        super();
        this._database = af;
        af.auth.subscribe((auth) => this.userId = auth.uid);
    }

    getScratchPads(): FirebaseListObservable<ScratchPad[]> {

        return this._database.database.list("/pads/" + this.userId);
    }

    createPad(pad: ScratchPad): Thenable<any> {
        var list = this._database.database.list("/pads/" + this.userId);
        return list.push(pad);
    }
}