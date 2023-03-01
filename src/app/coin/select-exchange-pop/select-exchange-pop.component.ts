import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
    selector: 'app-select-exchange-pop',
    templateUrl: './select-exchange-pop.component.html',
    styleUrls: ['./select-exchange-pop.component.scss']
})
export class SelectExchangePopComponent implements OnInit {
    @Input() data;
    @Input() usdt;

    constructor(
        private router: Router,
        public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        console.log(this.data)
    }

    navigate() {
        if (this.data.coin !== 'USDT') {
            this.activeModal.dismiss();
            this.router.navigate([`/trade/${this.data?.coin}_USDT`])
        } else {
            this.activeModal.dismiss();
            this.router.navigate([`/trade/BTC_USDT`])
        }
    }


}
