import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})
export class MarketsComponent implements OnInit {
  @Input() coinData;
  @Input() Param;
  MarketData;
  category = 'spot';
  loader = false;
  isMobile = false;
  constructor(private a_route: ActivatedRoute ,  private api: DataService) { }

  ngOnInit(): void {
      this.syncData();
    if (window.innerWidth < 990){
      this.isMobile = true;
    }
  }

  syncData(){
    this.loader = true;
    this.api.GetPairs(this.Param.id ,this.Param.slug , this.category).subscribe((res: any) => {
      this.MarketData = JSON.parse(res.response).data.market_pairs;
    }, () => {} , () => {
      this.loader = false;
    })
  }


  changeDataType(value) {
    this.category = value;
    this.MarketData = [];
    this.syncData();
  }


}
