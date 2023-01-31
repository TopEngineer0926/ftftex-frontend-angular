import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DepositComponent} from "../wallet/deposit/deposit.component";
import {SelectExchangePopComponent} from "../coin/select-exchange-pop/select-exchange-pop.component";
import {TransferComponent} from "../wallet/transfer/transfer.component";
import {RestClient} from "../rest-client";
import {DataService} from "../data.service";
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
  selector: 'app-wallet-main',
  templateUrl: './wallet-main.component.html',
  styleUrls: ['./wallet-main.component.scss']
})
export class WalletMainComponent implements OnInit {
  LogginIn
  tab: string = ''
  constructor(
      private api: DataService,
      private route: Router,
      private modalService: NgbModal
  ) {
    this.api.Loggedin.subscribe((res: any) => {
      if (!res[0]) {
        this.route.navigate(['/login']);
      } else {
        this.LogginIn = res;
      }
    })
  }

  ngOnInit(): void {
    client.getSubAccountBalances(this.LogginIn[5]).then((res) => {
      console.log(res, 'res');
    })
    client.getSubAccountFundingBalances(this.LogginIn[5]).then((res) => {
      console.log(res, 'res');
    })
  }


  changeTag(value){
    this.tab = value;
  }


  openDepositModal() {
    const modalRef = this.modalService.open(DepositComponent , {centered: true, scrollable: true});
  }

  openTransferModal() {
    const modalRef = this.modalService.open(TransferComponent , {centered: true, scrollable: true});
  }
}
