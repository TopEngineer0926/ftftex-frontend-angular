import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-wallet-account',
  templateUrl: './wallet-account.component.html',
  styleUrls: ['./wallet-account.component.scss']
})
export class WalletAccountComponent implements OnInit {

  Pairs;
  walletTab = 'assets';
  SelectedExchange = {id : 270 , slug: 'binance' , name : 'BINANCE'};
  SelectedPair = {coin : 'BTC' , pair: 'USDT'};
  SelectedPairFull;
  Total = 0;
  Available1 = 0;
  Available2 = 0;
  showOrder = false;
  Coins = [
    {symbol : 'BTC' , img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' , holding: 0.00},
    {symbol : 'USDT' , img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png' , holding: 100},
    {symbol : 'ETH' , img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' , holding: 0.00},
    {symbol : 'BNB' , img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' , holding: 0.00},
    {symbol : 'XRP' , img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png' , holding: 0.00},
    {symbol : 'ADA' , img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png' , holding: 0.00},
  ];


  BUY = {
    price : 0,
    Amount : 0
  };

  ALLOWEDMARKETPAIRS = ['BTC/USDT' , 'BTC/USD' , 'XRP/USDT' , 'ETH/USDT','ETH/USD' , 'BTC/USD' , 'BNB/USDT' , 'ADA/USDT' , 'SOL/USDT' , 'BTC/ETH'];
  showChart: boolean = true;
  constructor(private api: DataService ,  private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadMarket();
    this.loadTotal();
  }

  loadTotal(){
    this.Total = 0;
    for (let dta of this.Coins) {
      this.Total += dta.holding;
    }
  }
  loadMarket(){
    this.api.GetExchangePairs(this.SelectedExchange.id, this.SelectedExchange.slug , 'spot' , 10).subscribe((res: any) => {
      this.Pairs = JSON.parse(res.response).data.market_pairs;
      this.SelectedPairFull = this.Pairs[0];
      this.SelectedPair.coin = this.Pairs[0].market_pair_base.currency_symbol;
      this.SelectedPair.pair =   this.Pairs[0].market_pair_quote.currency_symbol;
      this.BUY.price = this.Pairs[0].quote.USD.price;
      this.countAvaialable();
    },() => {} , () => {
    });
  }

  SwitchWalletTab(value){
    this.walletTab = value;
  }
  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' , centered: true ,size: "lg"}).result.then((result) => {
    }, (reason) => {
    });
  }

  switchExchanges(value) {
    this.SelectedExchange = value;
    this.SelectedPair = {coin : 'BTC' , pair: 'USDT'};
    this.loadMarket();
    this.showChart = false;
    setTimeout(() => {
      this.showChart = true
    }, 10);

  }

  changePairs(dta: any) {
    console.log(dta);
    this.SelectedPairFull = dta;
    this.SelectedPair.coin = dta.market_pair_base.currency_symbol;
    this.SelectedPair.pair =   dta.market_pair_quote.currency_symbol;
    this.BUY.price = dta.quote.USD.price;
    this.showChart = false;
    setTimeout(() => {
      this.showChart = true
    }, 10);

    console.log(dta);
    this.countAvaialable();
  }


  countAvaialable(){
    const data = this.Coins.find(x => x.symbol === this.SelectedPair.pair);
    //@ts-ignore
    this.Available1 = data.holding
  }


  BuyCoin(){

    this.showOrder = true;
    setTimeout(() => {
      this.showOrder = false;
      this.BUY.Amount= 0;
    }, 4000);
  }
}
