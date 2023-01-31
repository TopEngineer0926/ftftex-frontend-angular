import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SelectNetworkComponent} from "./select-network/select-network.component";
import {RestClient} from "../../rest-client";

const client = new RestClient({
    apiKey: '7f9eedd1-56d7-4555-9d2b-2242668d4f2e',
    // apiKey: 'apiKeyHere',
    apiSecret: '5F28B22584E8689C5FF1E67C6BEC75DA',
    // apiSecret: 'apiSecretHere',
    apiPass: 'FTFTxOKX@123)',
    // apiPass: 'apiPassHere',
});

interface Currency {
    [key: string]: any[];
}


@Component({
    selector: 'app-deposit',
    templateUrl: './deposit.component.html',
    styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

    tab = 'crypto';
    currencies: Currency

    constructor(private modalService: NgbModal
    ) {

    }

    ngOnInit(): void {
        client.getCurrencies().then((res) => {
            this.currencies = this.groupBy(res, 'ccy');
            console.log(this.currencies, 'this.currencies');
        })
    }

    changeTab(val: string) {
        this.tab = val;
    }

    groupBy(xs: any[], key: string) {
        return xs.reduce((rv: any, x: any) => {
            (rv[x[key]] = rv[x[key]] || []).unshift(x);
            return rv;
        }, {});
    };

    selectCurrency(ccy: any) {
        const modalRef = this.modalService.open(SelectNetworkComponent, {
            centered: true, scrollable: true, modalDialogClass: 'network-modal-sm'
        });
        modalRef.componentInstance.chains = ccy.value;
    }
}
