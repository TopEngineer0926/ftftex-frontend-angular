import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss']
})
export class ExchangesComponent implements OnInit {

  ExchangeData;
  Category = 'spot';
  loader = false;
  page = 1;
  limit = 20;
  totalCount = 0;
  order = {
    field: 'rank',
    reversed: false
  };
  isMobile = false;
  constructor(private api: DataService) {
    this.isMobile = this.api.isMobile;
  }

  ngOnInit(): void {
    this.syncData();
  }



  syncData(){
    this.loader = true;
    this.api.GetExchangesList(this.Category , this.page , this.limit).subscribe((res: any) => {
      this.ExchangeData = JSON.parse(res.response).data;
      this.totalCount = JSON.parse(res.response).status.total_count;
    }, () => {} , () => {
      this.loader = false;
    })
  }

  switchSubTab(value: string) {
    this.Category = value;
    this.ExchangeData = [];
    this.page = 1;
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

  changePage(p) {
    this.page = p;
    this.syncData();
    window.scroll(0,0)
  }
}
