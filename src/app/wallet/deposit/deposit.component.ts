import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SelectNetworkComponent} from "./select-network/select-network.component";
import {RestClient} from "../../rest-client";
import {environment} from "../../../environments/environment";
import {DataService} from "../../data.service";

const client = new RestClient({
    apiKey: environment.apiKey,
    apiSecret: environment.apiSecret,
    apiPass: environment.apiPass,
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

    constructor(private modalService: NgbModal,
                private api: DataService
    ) {

    }

    ngOnInit(): void {
        const params = {
            "ccy":"BTC,ETH,USDT"
        }
        this.api.getCurrencies(params).subscribe((res) => {
            console.log(JSON.parse(res['KYC Api resuult']).data, 'asdad');
            this.currencies = this.groupBy(JSON.parse(res['KYC Api resuult']).data, 'ccy');
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
