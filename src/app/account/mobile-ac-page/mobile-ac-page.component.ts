import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mobile-ac-page',
  templateUrl: './mobile-ac-page.component.html',
  styleUrls: ['./mobile-ac-page.component.scss']
})
export class MobileAcPageComponent implements OnInit {

  LogginIn;
  AvailableCoins;
  TotalUSD = 0;
  constructor(private api: DataService , private route: Router) {
    this.AvailableCoins =this.api.AvailableCoins;
  }

  ngOnInit(): void {
    this.api.Loggedin.subscribe((res: any) => {
      if (!res[0]){
        this.route.navigate(['/login']);
      } else {
        this.LogginIn = res;
      }
    });

    this.api.Assets.subscribe((res: any) => {
      for (let dta of this.AvailableCoins){
        if (res.coins[dta.coin] > 0){
          this.api.getSingleCoinPrices(dta.id , '').subscribe((res2: any) => {
            const Data = JSON.parse(res2.response).data[dta.id];
            this.TotalUSD+= Data.quote.USD.price * res.coins[dta.coin];
          });

        }
      }

    })
  }

}
