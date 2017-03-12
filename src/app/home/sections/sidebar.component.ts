import { BaseComponent } from "../../sharedcomponents/BaseComponent";
import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { PadService } from "../../services/PadService";
import { ScratchPad } from "../../models/scratchpad";
@Component({

    selector: 'sidebar',
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.css']

})

export class SidebarComponent extends BaseComponent {
    errors: Subject<string> = new Subject<string>();
    message: Subject<string> = new Subject<string>();

    myscratchPads: Observable<ScratchPad[]>;
    public model: ScratchPad = {
        description: '', id: '', key: '', title: ''
    };
    constructor(private padService: PadService) {
        super();
    }
    ngOnInit() {
        this.myscratchPads = this.padService.getScratchPads();
    }
    onCreatePad(): void {

        if (this.model.description != '' && this.model.title != '') {

            this.padService.createPad(this.model).then((response) => {
               
                this.message.next("Pad created..scribble now");
                setTimeout(() => {
                    this.message.next('');
                }), 2000;
            },
                (error) => this.errors.next(error.message));
        } else {
            this.errors.next("input a valid title and description");
        }

    }
}