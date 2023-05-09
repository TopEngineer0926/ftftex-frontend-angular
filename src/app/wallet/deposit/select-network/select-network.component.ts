import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DepositNetworkComponent} from "../deposit-network/deposit-network.component";
import {RestClient} from "../../../rest-client";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

const client = new RestClient({
    apiKey: environment.apiKey,
    apiSecret: environment.apiSecret,
    apiPass: environment.apiPass,
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
        this.api.createDepositAddressForSubAccount(params).subscribe((res) => {
            console.log(res, 'res');
            const modalRef = this.modalService.open(DepositNetworkComponent, {
                centered: true, scrollable: true,
                modalDialogClass: 'network-modal-sm'
            });
            modalRef.componentInstance.createdDeposit = JSON.parse(res['KYC Api resuult']).data[0] ;
        })

    }
}
