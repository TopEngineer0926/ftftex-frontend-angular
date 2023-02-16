import {Component, Input, OnInit} from '@angular/core';


@Component({
    selector: 'app-deposit-network',
    templateUrl: './deposit-network.component.html',
    styleUrls: ['./deposit-network.component.scss']
})
export class DepositNetworkComponent implements OnInit {

    @Input('createdDeposit') createdDeposit: any;

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.createdDeposit, 'createdDeposit');

    }

    copy(add) {
        navigator.clipboard.writeText(add);
    }

}
