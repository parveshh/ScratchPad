import { BaseComponent } from "../../sharedcomponents/BaseComponent";
import { Component } from "@angular/core";
import { IAppState } from "../../StateStore/Store";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import { ScratchPad } from "../../models/scratchpad";

@Component({

    selector: 'content-component',
    templateUrl: 'content.html'

})

export class ContentComponent extends BaseComponent {


    @select((state: IAppState) => state.scratchpad) selectedScratchPad: Observable<ScratchPad>;
    scratchPad: ScratchPad;
    constructor() {
        super();
        this.subscriptions.push(this.selectedScratchPad.subscribe((pad) => this.scratchPad = pad));
    }

}