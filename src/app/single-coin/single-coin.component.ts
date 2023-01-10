import {AfterViewInit, Component, OnInit,} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";
import * as moment from 'moment';
@Component({
  selector: 'app-single-coin',
  templateUrl: './single-coin.component.html',
  styleUrls: ['./single-coin.component.scss']
})
export class SingleCoinComponent implements OnInit {
  Data;
  PriceData;
  Param;

  Submenu = 'overview';
  constructor(private a_route: ActivatedRoute , private api: DataService) {
  }


  ngOnInit(): void {
    window.scroll(0,0);
    this.a_route.params.subscribe((param: any) => {
      this.api.getSingleCoinData(param.id , param.slug).subscribe((res: any) => {
        this.Data = JSON.parse(res.response).data[param.id];
        this.Param = param;
      },() => {} , () => {
        this.api.getSingleCoinPrices(param.id , this.Data.slug).subscribe((res: any) => {
          this.PriceData = JSON.parse(res.response).data[param.id];
        });
      });
    })
  }


  switchSubTab(val) {
    this.Submenu = val;
  }






}
