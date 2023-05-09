import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ITooltipRenderEventArgs, IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
declare const TradingView: any;


@Component({
  selector: 'app-candle-chart',
  templateUrl: './candle-chart.component.html',
  styleUrls: ['./candle-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CandleChartComponent implements OnInit {
  @ViewChild('tradingview_c6b4d') tradingview_c6b4d?: ElementRef;
  @Input() chartData;
  @Input() Coin;

  ShowTradingView = false;
   primaryXAxis: Object = { majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true } };
   primaryYAxis: Object = {lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', width: 0 },};
   crosshair: Object = {enable: true};
   tooltipRender(args: ITooltipRenderEventArgs): void {
    //@ts-ignore
    if (args.text.split('<br/>')[4]) {
      //@ts-ignore
      let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], 10);
      let value: string = (target / 100000000).toFixed(1) + 'B';
      //@ts-ignore
      args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
    }
  };
  // custom code start
   load(args: IStockChartEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };

   tooltip: object = { enable: true };
   chartArea: Object = {
    border: {
      width: 0
    }
  };
   enable: boolean = true;




  constructor() {
    //code
  }

  ngOnInit(): void {

  }




}
