import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {SelectExchangePopComponent} from "../coin/select-exchange-pop/select-exchange-pop.component";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TradingDataServiceService} from "../trading-data-service.service";

@Component({
  selector: 'app-coin-all',
  templateUrl: './coin-all.component.html',
  styleUrls: ['./coin-all.component.scss']
})
export class CoinAllComponent implements OnInit {
  CoinData: any;
  page= 1;
  limit = 100;
  tag = 'all';
  loader = false;
  sort = "market_cap";
  sort_dir = "desc";
  totalCount = 0;

  order = {
    field: 'cmc_rank',
    reversed: false
  };
  isMobile = false;
  AlowedPairs: any = [];
  constructor(private api: DataService, public route: Router , private modalService: NgbModal , private apiT: TradingDataServiceService) {
    if (window.innerWidth < 990){
      this.isMobile = true;
    }
    this.AlowedPairs = this.apiT.Pairs;
  }

  ngOnInit(): void {
    this.syncData();
  }
  syncData(){
    this.loader = true;
    this.api.getCoinData(this.page , this.limit , this.tag , this.sort , this.sort_dir).subscribe((res: any) => {
      this.CoinData = JSON.parse(res.response).data;
      this.totalCount = JSON.parse(res.response).status.total_count;
    }, () => {} , () => {
      this.loader = false;
    });
  }


  changeTag(value){
    this.tag = value;
    this.CoinData = [];
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

  navigationCheck(url , coin) {

    if (this.AlowedPairs.includes(coin+'USDT')){
      const modalRef = this.modalService.open(SelectExchangePopComponent , {centered: true});
      modalRef.componentInstance.data = {url , coin};
    } else {
      this.route.navigate(['/coin/' + url])
    }
  }
}
