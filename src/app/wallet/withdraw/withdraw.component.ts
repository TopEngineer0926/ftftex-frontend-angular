import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
    selector: 'app-withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

    @ViewChild('transferDone', {static: false}) transferDone: ElementRef | undefined;
    @Input('balances') balances;
    selectedCoin;
    amount: string;
    address: string;
    fromMain: boolean = false;
    errorMessage = '';
    LogginIn

    constructor(
        private modalService: NgbModal,
        private route: Router,
        private api: DataService,) {
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

    selectCoin(coin) {
        this.selectedCoin = coin
    }

    transfer() {
        const params = {
            amt: this.amount,
            "fee": "0.0005",
            dest: 4,
            ccy: this.selectedCoin.ccy,
            chain: 'USDT-TRC20',
            toAddr: this.address,
            subAcct: this.LogginIn[5]
        }
        this.api.createWithdrawal(params).subscribe((res) => {
            const result = JSON.parse(res['KYC Api resuult']);
            console.log(result, 'result');
            if (!result.data.length && result.msg) {
                this.errorMessage = result.msg;
            } else if (!res.msg) {
                this.modalService.open(this.transferDone, {
                    ariaLabelledBy: 'modal-basic-title',
                    centered: true
                }).result.then((result) => {
                }, (reason) => {
                });
            }
            console.log(result)
        })
    }

    continue() {
        this.modalService.dismissAll();
    }

}
