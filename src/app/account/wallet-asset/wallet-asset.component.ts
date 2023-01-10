import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-wallet-asset',
  templateUrl: './wallet-asset.component.html',
  styleUrls: ['./wallet-asset.component.scss']
})
export class WalletAssetComponent implements OnInit {

  Assets: any = [];
  isMobile = false;
  TotalUSD = 0;
  BTCTotal = 0;
  AvailableCoins;
  constructor(private api: DataService) {
    if (window.innerWidth < 990){
      this.isMobile = true;
    }
    this.api.getSingleCoinPrices(1 , '').subscribe((res2: any) => {
      this.BTCTotal = JSON.parse(res2.response).data[1].quote.USD.price;
    });
    this.AvailableCoins = this.api.AvailableCoins;
  }

  ngOnInit(): void {
    this.api.Assets.subscribe((res: any) => {
      this.Assets = [];
     for (let dta of this.AvailableCoins){
       if (res.coins[dta.coin] > 0){
         this.api.getSingleCoinPrices(dta.id , '').subscribe((res2: any) => {

           const Data = JSON.parse(res2.response).data[dta.id];
           this.Assets.push( {Coin : dta.coin, Total: res.coins[dta.coin] , Available: res.coins[dta.coin] , InOrder: 0.00000000, ValueBTC: 0.00000000 ,
             priceUSD: Data.quote.USD.price , totalUSD: Data.quote.USD.price * res.coins[dta.coin] });

           this.TotalUSD+= Data.quote.USD.price * res.coins[dta.coin];
         });

       }
     }

    })
  }

}
