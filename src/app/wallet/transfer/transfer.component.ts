import { Component, OnInit } from '@angular/core';
import {RestClient} from "../../rest-client";

const client = new RestClient({
  apiKey: '7f9eedd1-56d7-4555-9d2b-2242668d4f2e',
  // apiKey: 'apiKeyHere',
  apiSecret: '5F28B22584E8689C5FF1E67C6BEC75DA',
  // apiSecret: 'apiSecretHere',
  apiPass: 'FTFTxOKX@123)',
  // apiPass: 'apiPassHere',
});

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})

export class TransferComponent implements OnInit {
  selectedCoin: string;
  amount: string;
  fromMain: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  selectCoin() {
    this.selectedCoin = 'BTC'
  }

  transfer() {

    const params = {
      ccy: this.selectedCoin,
      amt: this.amount,
      from: '6',
      to: '18'
    }
    client.fundsTransfer(params).then((res) => {
      console.log(res, 'res');
    })

  }

}
