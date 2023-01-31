import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DepositNetworkComponent} from "../deposit-network/deposit-network.component";
import {RestClient} from "../../../rest-client";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";

const client = new RestClient({
    apiKey: '7f9eedd1-56d7-4555-9d2b-2242668d4f2e',
    // apiKey: 'apiKeyHere',
    apiSecret: '5F28B22584E8689C5FF1E67C6BEC75DA',
    // apiSecret: 'apiSecretHere',
    apiPass: 'FTFTxOKX@123)',
    // apiPass: 'apiPassHere',
});


@Component({
    selector: 'app-select-network',
    templateUrl: './select-network.component.html',
    styleUrls: ['./select-network.component.scss']
})
export class SelectNetworkComponent implements OnInit {
    LogginIn;

    @Input('chains') chains;

    constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, private api: DataService,
                private route: Router,) {
        this.api.Loggedin.subscribe((res: any) => {
            if (!res[0]) {
                this.route.navigate(['/login']);
            } else {
                this.LogginIn = res;
            }
        })
    }

    ngOnInit(): void {
    }


    selectNetwork(network: any) {
        this.activeModal.close();
        const params = {
            ccy: network.ccy,
            subAcct: this.LogginIn[5],
            chain: network.chain
        }
        client.createDepositAddressForSubAccount(params).then((res) => {
            console.log(res, 'res');
            const modalRef = this.modalService.open(DepositNetworkComponent, {
                centered: true, scrollable: true,
                modalDialogClass: 'network-modal-sm'
            });
            modalRef.componentInstance.createdDeposit = res[0];
        })

    }
}
