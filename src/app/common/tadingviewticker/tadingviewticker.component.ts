import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DataService} from "../../data.service";
@Component({
  selector: 'app-tadingviewticker',
  templateUrl: './tadingviewticker.component.html',
  styleUrls: ['./tadingviewticker.component.scss']
})
export class TadingviewtickerComponent implements OnInit , AfterViewInit  {
  @ViewChild('tradingview') tradingview?: ElementRef;
  Theme = 'dark';
  constructor(private _renderer2: Renderer2 , private api: DataService) {
     this.api.Theme.subscribe(res => {this.Theme = res;});
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.text = `
    {
  "symbols": [
    {
      "description": "BTC",
      "proName": "BITSTAMP:BTCUSD"
    },
    {
      "description": "ETH",
      "proName": "BITSTAMP:ETHUSD"
    },
    {
      "description": "LTC",
      "proName": "BITSTAMP:LTCUSD"
    },
    {
      "description": "SOL",
      "proName": "BITSTAMP:SOLUSD"
    },
    {
      "description": "ADA",
      "proName": "BITSTAMP:ADAUSD"
    },
    {
      "description": "XRP",
      "proName": "BITSTAMP:XRPUSD"
    },
    {
      "description": "DOGE",
      "proName": "BINANCE:DOGEUSD"
    },
    {
      "description": "SHIB",
      "proName": "BITSTAMP:SHIBUSD"
    },
    {
      "description": "AVAX",
      "proName": "BITSTAMP:AVAXUSD"
    },
    {
      "description": "DOT",
      "proName": "BINANCE:DOTUSD"
    },
    {
      "description": "ATOM",
      "proName": "BINANCE:ATOMUSD"
    },
    {
      "description": "MATIC",
      "proName": "BITSTAMP:MATICUSD"
    },
    {
      "description": "BNB",
      "proName": "BINANCE:BNBUSD"
    },
    {
      "description": "TRX",
      "proName": "BINANCE:TRXUSD"
    },
    {
      "description": "UNI",
      "proName": "BINANCE:UNIUSD"
    },
    {
      "description": "ETC",
      "proName": "BINANCE:ETCUSD"
    }
  ],
  "showSymbolLogo": true,
  "colorTheme":"`+ this.Theme+ `",
  "isTransparent": false,
  "displayMode": "adaptive",
  "locale": "en"
}`;

    this.tradingview?.nativeElement.appendChild(script);
  }


}
