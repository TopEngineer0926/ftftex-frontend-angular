import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-gainers-and-losers',
  templateUrl: './gainers-and-losers.component.html',
  styleUrls: ['./gainers-and-losers.component.scss']
})
export class GainersAndLosersComponent implements OnInit {

  CoinData: any;
  page= 1;
  limit = 8;
  sortDir = 'desc';
  loader = false;

  order = {
    field: '#',
    reversed: false
  };
  isMobile = false;
  constructor(private api: DataService) {
    if (window.innerWidth < 990){
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
    this.syncData();
  }

  syncData(){
    this.loader = true;
    this.api.GainersAndLosers(this.sortDir , this.limit).subscribe((res: any) => {
      this.CoinData = JSON.parse(res.response['Result: '])?.data;
    }, () => {} , () => {this.loader = false;});
  }

  changeTag(value){
    this.sortDir = value;
    this.CoinData = [];
    this.syncData();
  }

  doSort(value) {
    if (this.order.field == value){
      if (this.order.reversed){
        this.order.reversed = false
      } else {
        this.order.reversed = true
      }
    } else {
      this.order.reversed = false;
      this.order.field = value;
    }
  }
}
