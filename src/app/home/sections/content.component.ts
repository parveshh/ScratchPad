import { BaseComponent } from "../../sharedcomponents/BaseComponent";
import { Component } from "@angular/core";

@Component({

    selector: 'content-component',
    templateUrl: 'content.html'

})

export class ContentComponent extends BaseComponent {

    title: string = "Morning Notes";
    constructor() {
        super();
    }

}