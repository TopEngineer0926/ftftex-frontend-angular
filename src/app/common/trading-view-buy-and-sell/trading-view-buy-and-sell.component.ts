import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-trading-view-buy-and-sell',
  templateUrl: './trading-view-buy-and-sell.component.html',
  styleUrls: ['./trading-view-buy-and-sell.component.scss']
})
export class TradingViewBuyAndSellComponent implements OnInit , AfterViewInit {
  @Input() COIN: string | undefined;
  Theme = 'dark';
  @ViewChild('tradingview') tradingview?: ElementRef;

  coins = ['BTC' , 'ETH' , 'BNB' , 'XRP' , 'ADA' , 'SOL' , 'MATIC' , 'DOGE' , 'SHIB' , 'AVAX' , 'DOT' , 'ATOM' , 'TRX' , 'UNI' , 'WBTC' , 'ETC' , 'LTC' , 'XTZ'];
  constructor(private _renderer2: Renderer2, private api: DataService) {
    this.api.Theme.subscribe(res => {this.Theme = res; console.log(res)});
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {

    //@ts-ignore
    if (this.coins.includes(this.COIN)){
      //@ts-ignore
      const SYMBOL = "BINANCE:" + this.COIN.toUpperCase() + 'USD';
      const Settings = {"interval": "1m","width": "100%" , "isTransparent": false,"height": "450","symbol":SYMBOL,"showIntervalTabs": true,"locale": "en", "colorTheme":this.Theme};
      let script = this._renderer2.createElement('script');
      script.type = `text/javascript`;
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
      script.text = JSON.stringify(Settings);

      this.tradingview?.nativeElement.appendChild(script);
    }

  }
}
