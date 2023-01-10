import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";
declare const TradingView: any;
@Component({
  selector: 'app-trading-view-td-chart',
  templateUrl: './trading-view-td-chart.component.html',
  styleUrls: ['./trading-view-td-chart.component.scss']
})
export class TradingViewTDChartComponent implements OnInit , AfterViewInit {
  @ViewChild('tradingview') tradingview?: ElementRef;
  @Input() COIN: string | undefined;
  @Input() PAIR: string | undefined;
  @Input() EXCHANGE: string | undefined;
  @Input() chartType: string | undefined;

  HideBar = false;
  Height = 610;
  Theme = 'light';
  coins = ['BTC' , 'ETH' , 'BNB' , 'XRP' , 'ADA' , 'SOL' , 'MATIC' , 'DOGE' , 'SHIB' , 'AVAX' , 'DOT' , 'ATOM' , 'TRX' , 'UNI' , 'WBTC' , 'ETC' , 'LTC' , 'XTZ'];

  constructor(private api: DataService) {
    if (window.innerWidth < 990){
      this.HideBar = true;
      this.Height = 400;
    }
     this.api.Theme.subscribe(res => {
       console.log('THEME' , res);
       this.Theme = res;
       this.ngAfterViewInit();
    });

  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    //@ts-ignore
    const SYMBOL = this.EXCHANGE + ":" + this.COIN.toUpperCase() + this.PAIR.toUpperCase();
    //@ts-ignore
    if (this.coins.includes(this.COIN)) {

      if (this.chartType === 'candle-chart') {
        new TradingView.widget({
          'container_id': 'technical-analysis',
          "width": "100%",
          "height": this.Height,
          "symbol": SYMBOL,
          "interval": "1",
          "timezone": "Etc/UTC",
          "theme": this.Theme,
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_side_toolbar": this.HideBar,
        });
      }



      if (this.chartType === 'price') {
        new TradingView.widget({
          'container_id': 'technical-analysis',
          "width": "100%",
          "height": 610,
          "symbol": SYMBOL,
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": this.Theme,
          "style": "3",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_side_toolbar": this.HideBar,
        });
      }

      if (this.chartType === 'market-cap') {
        new TradingView.widget({
          'container_id': 'technical-analysis',
          "width": "100%",
          "height": 610,
          "symbol": this.COIN,
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": this.Theme,
          "style": "3",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_side_toolbar": this.HideBar,
        });
      }


    }





  }
}

