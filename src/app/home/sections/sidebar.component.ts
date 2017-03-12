import { BaseComponent } from "../../sharedcomponents/BaseComponent";
import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { PadService } from "../../services/PadService";
import { ScratchPad } from "../../models/scratchpad";
import { select } from "@angular-redux/store/lib";
import { IAppState } from "../../StateStore/Store";
@Component({

    selector: 'sidebar',
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.css']

})

export class SidebarComponent extends BaseComponent {
    errors: Subject<string> = new Subject<string>();
    message: Subject<string> = new Subject<string>();
    @select('user') stateUser: Observable<any>;
    user: any;
    myscratchPads: Observable<ScratchPad[]>;
    selected: ScratchPad = {  description: '', id: '', key: '', title: ''};
    public model: ScratchPad = {
        description: '', id: '', key: '', title: ''
    };

    constructor(private padService: PadService) {
        super();

    }

    Init = (u): void => {

        this.myscratchPads = this.padService.getScratchPads(u.uid);
        this.user = u;
    }
    ngOnInit() {
        this.subscriptions.push(this.stateUser.subscribe(this.Init));
    }
    public onCreatePad(): void {

        if (this.model.description.trim() != '' && this.model.title.trim() != '') {
            this.errors.next('');
            this.padService.createPad(this.model, this.user.uid).then((response) => {
                console.log(response);
                this.message.next("Pad created..scribble now");
                setTimeout(() => {
                    this.message.next('');
                }, 2000);

                this.model.description = '';
                this.model.title = '';
            },
                (error) => this.errors.next(error.message));
        } else {
            this.errors.next("input a valid title and description");
        }

    }

    select(pad: ScratchPad): void {
        this.selected = pad;
    }
}