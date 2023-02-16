import { Component, OnInit } from '@angular/core';
import {RestClient} from "../../rest-client";
import {environment} from "../../../environments/environment";
import {DataService} from "../../data.service";

const client = new RestClient({
  apiKey: environment.apiKey,
  apiSecret: environment.apiSecret,
  apiPass: environment.apiPass,
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
  constructor(private api: DataService) { }

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
    this.api.fundsTransfer(params).subscribe((res) => {
      console.log(res, 'res');
    })
  }

}
