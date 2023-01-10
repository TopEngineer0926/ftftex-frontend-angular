import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-trending-coins',
  templateUrl: './trending-coins.component.html',
  styleUrls: ['./trending-coins.component.scss']
})
export class TrendingCoinsComponent implements OnInit, AfterViewInit {
  @ViewChild('timeline') timeline?: ElementRef;

  @Input() ViewType;
  CoinData: any;
  page = 1;
  limit = 8;
  sortDir = 'desc';
  loader = false;
  Theme = 'dark';

  order = {
    field: '#',
    reversed: false
  };
  isMobile = false;

  constructor(private api: DataService,
              private _renderer2: Renderer2) {
    this.api.Theme.subscribe(res => {
      this.Theme = res;
    });
    if (window.innerWidth < 990) {
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
    this.syncData();
  }

  syncData() {
    this.loader = true;
    this.api.GetTrendingCoins(this.limit).subscribe((res: any) => {
      this.CoinData = JSON.parse(res.response).data;
    }, () => {
    }, () => {
      this.loader = false;
    });
  }

  ngAfterViewInit() {
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.text = `{
      "feedMode": "all_symbols",
      "colorTheme":"${this.Theme}",
      "isTransparent": false,
      "displayMode": "regular",
      "width": "100%",
      "height": "830",
      "locale": "en"
    }`;
    this.timeline?.nativeElement.appendChild(script);
  }

  changeTag(value) {
    this.sortDir = value;
    this.CoinData = [];
    this.syncData();
  }

  doSort(value) {
    if (this.order.field == value) {
      if (this.order.reversed) {
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
