import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {RestClient} from "../rest-client";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

const client = new RestClient({
    apiKey: environment.apiKey,
    apiSecret: environment.apiSecret,
    apiPass: environment.apiPass,
});

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
    subEmail;
    message = '';
    LogginIn;
    walletInfo

    constructor(
        private api: DataService,
        private route: Router) {
        this.api.Loggedin.subscribe((res: any) => {
            if (!res[0]) {
                this.route.navigate(['/login']);
            } else {
                this.LogginIn = res;
            }
        })
    }

    ngOnInit(): void {
        const createSubAccountParams = {
            subAcct: this.LogginIn[5]
        }

        client.createSubAccount(createSubAccountParams).then((res) => {
            console.log(res, 'res');
        })

        const params = {
            subAcct: this.LogginIn[5],
            page: 1,
            limit: 100
        }
        client.getSubAccountList(params).then((res) => {
            console.log(res, 'res');
            this.walletInfo = res[0].details[0];
        })

        // client.getSubAccountDepositAddresses().then((res) => {
        //     console.log(res, 'res');
        //     // this.walletInfo = res[0].details[0];
        // })

        // client.getBrokerAccountInformation().then((res) => {
        //   console.log(res, 'res');
        // })


    }

    Subscribe() {
        this.message = '';
        this.api.walletSubscription({email: this.subEmail}).subscribe((res: any) => {
            this.message = 'Thank you !';
        }, () => {
            this.message = 'You have already subscribed !';
        });
    }

}
