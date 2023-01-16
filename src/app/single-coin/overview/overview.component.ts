import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";
import * as moment from 'moment';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() Data;
  @Input() PriceData;
  @Input() Param;


  OCHLData;
  chartData;
  primaryXAxis;
  primaryYAxis;
  marker;
  legendSettings;
  tooltip;
  crosshair: any;
  period = 'daily';
  interval = 'daily';
  count = 200;
  ChartType = 'price';

  Submenu = 'overview';

  constructor(private a_route: ActivatedRoute , private api: DataService) {
    // Tooltip for chart
    this.tooltip = { enable: true, shared: true, format: '${series.name} : ${point.x} : ${point.y}'};
    this.crosshair = { enable: true, line: {width: 1, color: 'rgba(0,0,0,0.35)'}};
    this.chartData = [];

    this.primaryXAxis = {
      valueType: 'DateTime',
      labelFormat: 'd-M-y',
      crosshairTooltip: { enable: true, fill: '#1577FF' },
      lineStyle: { width: 2 },
      majorGridLines: { width: 0 },
    };
    this.primaryYAxis = {
      labelFormat: '${value}',
      crosshairTooltip: { enable: true, fill: '#1577FF' },
      lineStyle: { width: 2 },
    };
    this.marker = {
      dataLabel:{
        visible: false
      },
    };
    this.legendSettings = {
      visible: false
    };
  }
  coins = ['BTC' , 'ETH' , 'BNB' , 'XRP' , 'ADA' , 'SOL' , 'MATIC' , 'DOGE' , 'SHIB' , 'AVAX' , 'DOT' , 'ATOM' , 'TRX' , 'UNI' , 'WBTC' , 'ETC' , 'LTC' , 'XTZ'];
  ShowTradingView = false;
  ngOnInit(): void {
    window.scroll(0,0);
    if (this.coins.includes(this.Data.symbol)){
      this.ShowTradingView = true;
    } else{
      this.loadChart();
    }

  }
  changeChartType(value: string) {
    this.ChartType = value;
    if (value === 'candle-chart'){
      this.count = 50;
      this.loadChart();
    }  else {
      this.count = 200;
      this.loadChart();
    }
  }

  async loadChart(){
    this.chartData = [];
    await  this.api.OCHLData(this.Param.id ,this.Data.slug , this.period , this.interval , this.count).subscribe((res: any) => {
      this.chartData = [];
      const Data = JSON.parse(res.response['Result: ']).data.quotes;
      /* const Data = res.data.quotes;*/

      for (let dta of  Data){
        this.chartData.push(
          {date : moment(dta.quote.USD.timestamp).format('MM/DD/YYYY HH:mm')  ,
            price: dta.quote.USD.close ,
            market_cap: dta.quote.USD.market_cap,
            open : dta.quote.USD.open,
            close : dta.quote.USD.close,
            high : dta.quote.USD.high,
            low : dta.quote.USD.low,
            volume: dta.quote.USD.volume
          });
      }
    });
  }
  changeChartInterval(value , value2 , count){
    this.period = value;
    this.interval = value2;
    this.count = count;
    this.chartData = [];
    this.loadChart();

  }
}
