import {Component, Input, OnInit} from '@angular/core';
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
  @Input('balances') balances;
  selectedCoin;
  amount: string;
  fromMain: boolean = false;
  errorMessage = ''
  constructor(private api: DataService) { }

  ngOnInit(): void {
  }

  selectCoin(coin) {
    this.selectedCoin = coin
  }

  transfer() {
    const params = {
      ccy: this.selectedCoin.ccy,
      amt: this.amount,
      from: '6',
      to: '18'
    }
    this.api.fundsTransfer(params).subscribe((res) => {
      const result = JSON.parse(res['KYC Api resuult']);
      console.log(result, 'result');
      if (!result.data.length && result.msg) {
        this.errorMessage = result.msg;
      }
      console.log(result)
    })
  }

}
