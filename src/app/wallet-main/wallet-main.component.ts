import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DepositComponent} from "../wallet/deposit/deposit.component";
import {TransferComponent} from "../wallet/transfer/transfer.component";
import {RestClient} from "../rest-client";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

const client = new RestClient({
  apiKey: environment.apiKey,
  apiSecret: environment.apiSecret,
  apiPass: environment.apiPass,
});

@Component({
  selector: 'app-wallet-main',
  templateUrl: './wallet-main.component.html',
  styleUrls: ['./wallet-main.component.scss']
})
export class WalletMainComponent implements OnInit {
  LogginIn
  tab: string = ''
  deposits: any;
  trading: any;
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
    const params = {
      subAcct: this.LogginIn[5],
    }
    this.api.getSubAccFoundBalance(params).subscribe((res) => {
      this.deposits = JSON.parse(res['KYC Api resuult'])?.data
      console.log(this.deposits, 'deposits');
    })
    this.api.getSubAccTradeBalance(params).subscribe((res) => {
      this.trading = JSON.parse(res['KYC Api resuult'])?.data?.details
      console.log(this.trading, 'trading');
    })
    // client.getSubAccountBalances(this.LogginIn[5]).then((res) => {
    //   console.log(res, 'res');
    // })
    // client.getSubAccountFundingBalances(this.LogginIn[5]).then((res) => {
    //   console.log(res, 'res');
    // })
  }


  changeTag(value){
    this.tab = value;
  }


  openDepositModal() {
    const modalRef = this.modalService.open(DepositComponent , {centered: true, scrollable: true});
  }

  openTransferModal() {
    const modalRef = this.modalService.open(TransferComponent , {centered: true, scrollable: true});
    modalRef.componentInstance.balances = this.deposits;
  }
}
