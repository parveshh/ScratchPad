import { OnDestroy, OnInit } from "@angular/core"
import { Subscription } from "rxjs/Subscription";
export class BaseComponent implements OnDestroy, OnInit {



    protected subscriptions: Subscription[] = [];
    constructor() { }


    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {

            // if (process.env != 'production') {
            //     console.log('unsuscribing:');
            //     console.log(subscription);
            // }
            subscription.unsubscribe()
        });
    }

    ngOnInit(): void {

    }


}