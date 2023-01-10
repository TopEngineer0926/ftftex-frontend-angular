import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  subEmail;
  message = '';

  constructor(private api: DataService) { }

  ngOnInit(): void {
  }

  Subscribe(){
    this.message = '';
    this.api.walletSubscription({email : this.subEmail}).subscribe((res: any) => {
      this.message = 'Thank you !';
    }, () => {
      this.message = 'You have already subscribed !';
    });
  }

}
