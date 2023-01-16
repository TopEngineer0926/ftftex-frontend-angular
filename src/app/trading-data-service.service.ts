import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs/Rx";
import {map} from "rxjs/operators";
import {TradingSocketServiceService} from "./trading-socket-service.service";

@Injectable({
  providedIn: 'root'
})
export class TradingDataServiceService {

  baseURL = 'https://api.binance.com/';
  WSbaseURL = 'wss://stream.binance.com:9443/';


  baseURLOkx = 'https://www.okx.com/'

  socket;
  Pairs = ["BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT","ADAUSDT","DOTUSDT","DOGEUSDT","SHIBUSDT","MATICUSDT","UNIUSDT","LTCUSDT","TRXUSDT","XRPUSDT"];
  liveData:Observable<any>;
  constructor(private http: HttpClient , public wsService: TradingSocketServiceService) {


  }

  getTradingPairs(){
    return this.http.get(this.baseURL + 'api/v3/exchangeInfo?symbols=' + JSON.stringify(this.Pairs));
  }

  ///api/v5/market/tickers
  getTradingPairsOkx(){
    return this.http.get(this.baseURLOkx + 'api/v5/market/tickers?instType=SPOT');
  }
  getLivePrices(symbol) {
    this.liveData = this.wsService.connect(this.WSbaseURL + 'stream?streams=!ticker@arr/'+ symbol+'@depth@1000ms/'+ symbol+'@trade/'+ symbol+'@bookTicker').pipe(map(
      (response: any) => {
        let data = response.data;
        return data;
      }
    ));
  }
  disconnect() {

  }
  getPriceTicker(){
    return this.http.get(this.baseURL + 'api/v3/ticker/24hr');
  }

  getMarketTrades(symbol: string){
    return this.http.get(this.baseURL + 'api/v3/trades?symbol='+symbol);
  }

  getMarketTradesOkx(symbol: string){
    return this.http.get(this.baseURLOkx + 'api/v5/market/trades?instId='+symbol);
  }

  getKlines(symbol:string, interval:string){
    return this.http.get(this.baseURL + 'api/v3/trades?symbol='+symbol+'&interval='+ interval);
  }


  getBidsandAsks(symbol , limit){
    return this.http.get(this.baseURL + 'api/v3/depth?symbol='+symbol+'&limit='+limit)
  }

  getBidsandAsksOkx(symbol , limit){
    return this.http.get(this.baseURLOkx + 'api/v5/market/books?instId='+symbol+'&sz='+limit)
  }


  GetTickerSocket() {
    let message: any = {
      "method": "SUBSCRIBE",
      "params":
        [
          "!ticker@arr",
        ],
      "id": 1
    };
    this.wsService.messages.next(message);

  }


  GetAsksAndBidsSocket(symbol) {
    let message: any = {
      "method": "SUBSCRIBE",
      "params":
        [
          symbol+"@depth",
        ],
      "id": 2
    };
    this.wsService.messages.next(message);
  }
}
