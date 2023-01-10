import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {DataService} from "../data.service";
import {ISparklineLoadEventArgs, SparklineTheme} from '@syncfusion/ej2-angular-charts';
import {timestamp} from "rxjs/operators";
import {ScriptService} from "../services/script.service";

@Component({
  selector: 'app-global-trending-metrics',
  templateUrl: './global-trending-metrics.component.html',
  styleUrls: ['./global-trending-metrics.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class GlobalTrendingMetricsComponent implements OnInit, AfterViewInit {

  @ViewChild('btcDominance') btcDominance: ElementRef;
  @ViewChild('marketcap') marketcap: ElementRef;
  @ViewChild('txVolume') txVolume: ElementRef;
  GlobalData;
  GlobalDataFiltered;
  isMobile = false;
  Theme = 'dark';

  constructor(private api: DataService,
              private _renderer2: Renderer2,
              private scriptService: ScriptService) {
    if (window.innerWidth < 990) {
      this.isMobile = true;
    }
    this.api.Theme.subscribe(res => {
      this.Theme = res;
    });
  }

  public axisSettings: object = {
    lineSettings: {
      visible: true
    }
  };
  public border: object = {color: '#0c1b30', width: 2};
  catTooltipSettings;
  catTooltipSettingsMC;
  catTooltipSettingsBTC;

  ngOnInit(): void {
    this.syncData();

    this.catTooltipSettings = {
      visible: true,
      format: '$ ${volume}',
      trackLineSettings: {
        visible: true
      }
    };

    this.catTooltipSettingsMC = {
      visible: true,
      format: '$ ${marketCap}',
      trackLineSettings: {
        visible: true
      }
    };

    this.catTooltipSettingsBTC = {
      visible: true,
      format: '${btc}',
      trackLineSettings: {
        visible: true
      }
    };
  }

  ngAfterViewInit() {
    const scriptText = `{
            "symbol": "CRYPTOCAP:BTC.D",
            "width": "100%",
            "height": 220,
            "locale": "en",
            "dateRange": "12M",
            "colorTheme":"${this.Theme}",
            "trendLineColor": "rgba(41, 98, 255, 1)",
            "underLineColor": "rgba(41, 98, 255, 0.3)",
            "underLineBottomColor": "rgba(41, 98, 255, 0)",
            "isTransparent": false,
            "autosize": false,
            "largeChartUrl": ""
          }`;
    const scriptElement = this.scriptService.loadJsScript(this._renderer2, "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js", scriptText)
    this.btcDominance?.nativeElement.appendChild(scriptElement);

    const marketCapText = `{
            "symbol": "CRYPTOCAP:USDT",
            "width": "100%",
            "height": 220,
            "locale": "en",
            "dateRange": "12M",
            "colorTheme":"${this.Theme}",
            "trendLineColor": "rgba(41, 98, 255, 1)",
            "underLineColor": "rgba(41, 98, 255, 0.3)",
            "underLineBottomColor": "rgba(41, 98, 255, 0)",
            "isTransparent": false,
            "autosize": false,
            "largeChartUrl": ""
          }`;
    const marketElement = this.scriptService.loadJsScript(this._renderer2, "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js", marketCapText)
    this.marketcap.nativeElement.appendChild(marketElement);

    const txVolume = `{
          "symbol": "INTOTHEBLOCK:BTC_TXVOLUME",
          "width": "100%",
          "height": 220,
          "locale": "en",
          "dateRange": "12M",
          "colorTheme":"${this.Theme}",
          "trendLineColor": "rgba(41, 98, 255, 1)",
          "underLineColor": "rgba(41, 98, 255, 0.3)",
          "underLineBottomColor": "rgba(41, 98, 255, 0)",
          "isTransparent": false,
          "autosize": false,
          "largeChartUrl": ""
        }`;
    const txVolumeElement = this.scriptService.loadJsScript(this._renderer2, "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js", txVolume)
    this.txVolume.nativeElement.appendChild(txVolumeElement);
  }

  syncData() {
    this.api.GlobalMetricsHistory().subscribe((res: any) => {
      this.GlobalData = JSON.parse(res.response).data;
    }, () => {
    }, () => {
      this.GlobalDataFiltered = [];
      for (let dta of this.GlobalData.quotes) {
        this.GlobalDataFiltered.push({
          volume: dta.quote.USD.total_volume_24h,
          marketCap: dta.quote.USD.total_market_cap,
          btc: dta.btc_dominance,
          x: dta.timestamp
        })
      }
    });

  }

}
