import {AfterContentChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TradingDataServiceService} from "../trading-data-service.service";
import {TradingSocketServiceService} from "../trading-socket-service.service";
import {DataService} from "../data.service";
import {SelectExchangePopComponent} from "../coin/select-exchange-pop/select-exchange-pop.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderStatusPopComponent} from "./order-status-pop/order-status-pop.component";
import {CoinSelectComponent} from "./coin-select/coin-select.component";

@Component({
  selector: 'app-trading-portal',
  templateUrl: './trading-portal.component.html',
  styleUrls: ['./trading-portal.component.scss']
})
export class TradingPortalComponent implements OnInit , OnDestroy ,AfterViewInit ,AfterContentChecked {
  @ViewChild('confirmation' , {static: false}) confirmation: ElementRef | undefined;
  Symbol;
  SymbolOkx;
  SymbolSeperated;
  AllPairs;
  AllPairsPrice:any = {};
  AllPairPriceChange = {};
  LatestTrade;
  tableFilters = ['' , 'BUSD' , 'USDT' , 'BNB' , 'BTC' , 'ETH' , 'XRP'];
  s_tableFilter  = '';
  bidsAndAsks: any = [];
  BestBidsAndAsk: any = {A: 0 , B: 0};
  BestBidsAndAskUpdate: any = {A: 0 , B: 0};
  bidsTotal = 0;
  askstotal = 0;
  upOrDown = 0;
  BUY = {
    price : 0,
    Amount : 0
  };
  SELL = {
    price : 0,
    Amount : 0
  };
  Total = 0;
  Available1 = 0;
  Available2 = 0;
  history
  Pair = {Coin: '' , Base : ''};
  currenttab = 'chart';
  innerWidth;
  isMobile = false;
  Assets: any = {};
  LoggedIn = {0: ''};

  OrderBuy: any = {
    lastPrice: 0, Amount: 0, Coin: '' , type: 'buy'
  };
  OrderSell: any = {
    lastPrice: 0, Amount: 0, Coin: '' , type: 'sell'
  };
  OrderType = '';
  errorMessage = '';
  errorMessageSell = '';
  constructor(private api: TradingDataServiceService, private a_rote: ActivatedRoute ,private Dapi: DataService , private modalService: NgbModal ) {
    this.innerWidth = window.innerWidth;
    if (innerWidth < 990){
      this.isMobile = true;
    }
    this.Dapi.Loggedin.subscribe((res: any) => {
      this.LoggedIn = res;
    })
  }

  getTradeHistory() {
    const params = {
      instType: "SPOT",
      subAcct: this.LoggedIn[5],
    }
    this.Dapi.getOrderHistory(params).subscribe((res) => {
      if (JSON.parse(res['Order history last 7 dayes'])?.data) {
       this.history = JSON.parse(res['Order history last 7 dayes']).data
      }
    })

  }

  ngOnInit(): void {
    this.Dapi.Assets.subscribe((res: any) => {
      this.Assets = res;
      console.log(res);
    });


    this.api.getTradingPairsOkx().subscribe({
      next: (res) => {
        console.log(res, 'res getTradingPairsOkx')
      }

    })

    this.api.getTradingPairs().subscribe((res: any) => {
      this.AllPairs = res.symbols;
    });
    this.api.getPriceTicker().subscribe((res: any) => {
      for (let dta of res){
        this.AllPairsPrice[dta.symbol] = dta;
      }
    });







    this.a_rote.params.subscribe((param: any) => {
      if (param['symbol']){
        this.SymbolSeperated = param['symbol'].replace('_' , '-');
        this.Symbol = param['symbol'].replace('_' , '');
        this.SymbolOkx = param['symbol'].replace('_' , '-');
        this.Pair.Coin = param['symbol'].split('_')[0];
        this.Pair.Base = param['symbol'].split('_')[1];
        console.log(this.Symbol);
        this.api.getMarketTradesOkx(this.SymbolOkx).subscribe({
          next: (res) => {
            console.log(res, 'res getMarketTradesOkx')
          },
          error: (err) => {
            console.log(err, 'errr ')
          }
        })
        this.api.getMarketTrades(this.Symbol).subscribe((res: any) => {
          this.LatestTrade = res;

        } , () => {} , () => {
          this.getStaticBidsandAsks();
          this.api.getLivePrices(this.Symbol.toLowerCase());
          this.api.liveData.subscribe(data => {
            const sData = JSON.parse(data);
            if (sData.stream === '!ticker@arr'){
              for (let dta of sData.data){
                if (this.AllPairsPrice[dta.s]){

                  if (this.AllPairsPrice[dta.s].symbol === this.Symbol){
                    if (Number(dta.c) === Number(this.AllPairsPrice[dta.s].lastPrice)){
                      this.upOrDown = 0;
                    } else {
                      if (Number(dta.c) > Number(this.AllPairsPrice[dta.s].lastPrice)){
                        this.upOrDown = 1;
                      } else {
                        this.upOrDown = -1;
                      }
                    }

                  }

                  this.AllPairsPrice[dta.s].lastPrice = dta.c;
                  this.AllPairsPrice[dta.s].priceChangePercent = Number(dta.P);
                }
              }
            }
            if (sData.stream === this.Symbol.toLowerCase()+'@bookTicker'){
              if (this.BestBidsAndAskUpdate.B < Number(sData.data.B)){
                this.BestBidsAndAsk.B = sData.data.B;
              }
              if (this.BestBidsAndAskUpdate.A < Number(sData.data.A)){
                this.BestBidsAndAsk.A = sData.data.A;
              }
            }

            if (sData.stream === this.Symbol.toLowerCase()+'@depth@1000ms'){
              if (sData.data.u  > this.bidsAndAsks.lastUpdateId + 1) {
                if (sData.data.a.length > 0) {
                  if (this.BestBidsAndAsk.B){
                    this.BestBidsAndAskUpdate.B = Number(this.BestBidsAndAsk.B);
                  }
                  if (this.BestBidsAndAsk.A) {
                    this.BestBidsAndAskUpdate.A = Number(this.BestBidsAndAsk.A);
                  }
                  for (let i = 0; i < sData.data.a.length; i++) {
                    if (Number(sData.data.a[i][1]) > 0) {
                      this.bidsAndAsks.asks.push(sData.data.a[i]);
                      this.bidsAndAsks.asks.splice(0, 1);
                    } else {
                    }
                  }
                }
                if (sData.data.b.length > 0) {
                  for (let i = 0; i < sData.data.b.length; i++) {
                    if (Number(sData.data.b[i][1]) > 0) {
                      this.bidsAndAsks.bids.push(sData.data.b[i]);
                      this.bidsAndAsks.bids.splice(0, 1);
                    } else {
                    }
                  }
                }
              }
            }
            if (sData.stream === this.Symbol.toLowerCase()+'@trade'){
              this.LatestTrade.splice(0 , 1);
              this.LatestTrade.push({price: sData.data.p , qty: sData.data.q , time: sData.data.T});
            }
          });


        });



      }
    });

    this.getTradeHistory();

  }

  ngOnDestroy() {
    this.api.disconnect();
  }

  ngAfterViewInit(): void {

  }
  ngAfterContentChecked(){
    /*this.api.GetTickerSocket();*/
  /*  this.api.GetAsksAndBidsSocket(this.Symbol.toLowerCase());*/
  }

  getStaticBidsandAsks(){
    this.api.getBidsandAsksOkx(this.SymbolOkx, 16).subscribe({
      next: (res) => {
        console.log(res, 'res');
      },
      error: (err) => {
        console.log(err, 'err');
      }
    })

    this.api.getBidsandAsks(this.Symbol , 16).subscribe((res: any) => {
      this.bidsAndAsks = res;
      this.bidsTotal = 0;
      this.askstotal = 0;
      for (let dta of res.bids){
        this.bidsTotal += Number(dta[1]);
      }
      for (let dta of res.asks){
        this.askstotal +=  Number(dta[1]);
      }
    });
  }

  navigate(baseAsset: any, quoteAsset: any) {
    window.location.href = 'trade/'+ baseAsset+'_'+quoteAsset;
  }

  doBuy(lastPrice: any, Amount: number, Coin: string) {
    this.OrderBuy.lastPrice = lastPrice;
    this.OrderBuy.Amount = Amount;
    this.OrderBuy.Coin = Coin;
    this.OrderBuy.type = 'buy';
    this.OrderType = 'buy';
    this.modalService.open(this.confirmation , {centered: true});
  }
  doSell(lastPrice: any, Amount: number, Coin: string){
    this.OrderSell.lastPrice = lastPrice;
    this.OrderSell.Amount = Amount;
    this.OrderSell.Coin = Coin;
    this.OrderSell.type = 'buy';
    this.OrderType = 'sell';
    this.modalService.open(this.confirmation , {centered: true});
  }


  performOrder(){
    console.log(this.OrderType, 'OrderType');
    this.modalService.dismissAll();
    if (this.OrderType === 'buy'){
       this.Assets.coins[this.OrderBuy.Coin.toLowerCase()] = this.Assets.coins[this.OrderBuy.Coin.toLowerCase()] + this.OrderBuy.Amount / this.OrderBuy.lastPrice;
       this.Assets.coins.usdt = this.Assets.coins.usdt - this.OrderBuy.Amount;
       this.Dapi.ChangeAssets(this.Assets);
       // const modalRef = this.modalService.open(OrderStatusPopComponent , {centered: true});
      const params = {
        "instId":this.SymbolSeperated,
        "tdMode":"cash",
        "clOrdId":`b${(Math.random() * 100).toFixed()}`,
        "side":"buy",
        "ordType":"market",
        // "px":lastPrice,
        "sz": this.BUY.Amount,
        "subAcct": this.LoggedIn[5]
      }
      this.Dapi.createTradeOrder(params).subscribe({
        next: (res) => {
          const result = JSON.parse(res['KYC Api resuult']);
          if (result.data.length && result.data[0].sMsg) {
            this.errorMessage = result.data[0].sMsg;
            this.getTradeHistory();
          } else {
          }
          console.log(result, 'result');
        },
        error: () => {

        }
      })
       this.resetFields();
    }
    if (this.OrderType === 'sell'){
      this.Assets.coins[this.OrderSell.Coin.toLowerCase()] = this.Assets.coins[this.OrderSell.Coin.toLowerCase()] - this.OrderSell.Amount;
      this.Assets.coins.usdt =  this.Assets.coins.usdt + this.OrderSell.Amount * this.OrderSell.lastPrice;
      this.Dapi.ChangeAssets(this.Assets);
      // const modalRef = this.modalService.open(OrderStatusPopComponent , {centered: true});
      const params = {
        "instId":this.SymbolSeperated,
        "tdMode":"cash",
        "clOrdId":`b${(Math.random() * 100).toFixed()}`,
        "side":"sell",
        "ordType":"market",
        "sz": this.SELL.Amount
      }
      this.Dapi.createTradeOrder(params).subscribe({
        next: (res) => {
          const result = JSON.parse(res['KYC Api resuult']);
          if (result.data.length && result.data[0].sMsg) {
            this.errorMessageSell = result.data[0].sMsg;
            this.getTradeHistory();
          }
          console.log(result, 'result');
        },
        error: () => {

        }
      })
      this.resetFields();
    }
  }

  resetFields(){
    this.BUY = {
      price : 0,
      Amount : 0
    };
    this.SELL = {
      price : 0,
      Amount : 0
    };

    this.OrderBuy = {
      lastPrice: 0, Amount: 0, Coin: '' , type: 'buy'
    };
    this.OrderSell = {
      lastPrice: 0, Amount: 0, Coin: '' , type: 'sell'
    };
  }

  SwitchSymbol() {
    const modalRef = this.modalService.open(CoinSelectComponent , {centered: true});
    modalRef.componentInstance.AllPairs = this.AllPairs;
    modalRef.componentInstance.AllPairsPrice = this.AllPairsPrice;
    this.resetFields();
  }
}
