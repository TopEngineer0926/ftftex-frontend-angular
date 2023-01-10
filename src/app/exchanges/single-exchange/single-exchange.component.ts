import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";
import {TradingDataServiceService} from "../../trading-data-service.service";

@Component({
  selector: 'app-single-exchange',
  templateUrl: './single-exchange.component.html',
  styleUrls: ['./single-exchange.component.scss']
})
export class SingleExchangeComponent implements OnInit {

  Param;
  Data;
  Pairs;
  category = 'spot';
  isMobile = false;
  AvailablePairs: any = [];
  constructor(private a_route: ActivatedRoute , private api: DataService, private TApi: TradingDataServiceService) {
    this.isMobile = this.api.isMobile;
    this.AvailablePairs = this.TApi.Pairs;
  }

  ngOnInit(): void {
    this.a_route.params.subscribe((param: any) => {
      this.api.GetSingleExchange(param.id , param.slug).subscribe((res: any) => {
        this.Data = JSON.parse(res.response).data[param.id];

        this.Param = param;
      },() => {} , () => {
        this. loadMarket();
      });
    })

  }

  loadMarket(){
    this.api.GetExchangePairs(this.Param.id, this.Param.slug , this.category , 100).subscribe((res: any) => {
      const Allpairs = JSON.parse(res.response).data.market_pairs;
      console.log(Allpairs);
      this.Pairs = [];
      for (let dta of Allpairs){
        if (dta.market_pair_quote.currency_symbol === 'USDT'){
          if (this.AvailablePairs.includes(dta.market_pair.replace('/' , ''))){
            this.Pairs.push(dta);
          }
        }
      }

    },() => {} , () => {
    });
  }

  changeDataType(value: string) {
    this.Pairs = [];
    this.category = value;
    this.loadMarket();
  }
}
