import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../environments/environment";
import {AccountPositionModeResult} from "./types";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // BaseURL = 'https://api.ftftx.com/'; //PRODUCTION API
  // BaseURL2 = 'https://verification.ftftx.com/'; //PRODUCTION API


  // BaseURL = 'https://stgapi.ftftx.com/';    //STAGING API
  // BaseURL2 = 'https://staging-verification.ftftx.com/';  //STAGING API

  DialingCode =  new BehaviorSubject({
    "name": "United Arab Emirates",
    "dialCode": "+971",
    "isoCode": "AE",
    "flag": "https://cdn.kcak11.com/CountryFlags/countries/ae.svg"
  });

  Loggedin = new BehaviorSubject({});
  Theme = new BehaviorSubject('dark');
  Assets = new BehaviorSubject({
    "ordered": [],
    "coins": {
      "usdt": 0,
      "eth": 0,
      "bnb": 0,
      "btc": 0,
      "sol" : 0,
      "ada" : 0,
      "dot" : 0,
      "doge" : 0,
      "shib" : 0,
      "matic" : 0,
      "uni" : 0,
      "ltc" : 0,
      "trx" : 0,
      "xrp" : 0,
    }
  });
  isMobile = false;
  AvailableCoins = [
    {id: 825 , coin : "usdt"},
    {id: 1027 , coin : "eth"},
    {id: 1 , coin : "btc"},
    {id: 1839 , coin : "bnb"},
    {id: 5426 , coin : "sol"},
    {id: 2010 , coin : "ada"},
    {id: 6636 , coin : "dot"},
    {id: 74 , coin : "doge"},
    {id: 5994 , coin : "shib"},
    {id: 3890 , coin : "matic"},
    {id: 7083 , coin : "uni"},
    {id: 2 , coin : "ltc"},
    {id: 1958 , coin : "trx"},
    {id: 52 , coin : "xrp"}
  ];
  constructor(private http: HttpClient) {
    if (window.innerWidth < 990){
      this.isMobile = true;
    }
      if (localStorage.getItem('usr')) {
        // @ts-ignore
        const parsed = JSON.parse(localStorage.getItem('usr'));
          this.Loggedin.next(parsed)
      }

    if (localStorage.getItem('asts')) {
      // @ts-ignore
      const parsed = JSON.parse(localStorage.getItem('asts'));
      this.Assets.next(parsed);
    }
    if (localStorage.getItem('mode')) {
      let mode = localStorage.getItem('mode');
      // @ts-ignore
      this.Theme.next(mode);
    } else {
      localStorage.setItem('mode' , 'dark')
    }


  }

  changeTheme(value){
    this.Theme.next(value);
    localStorage.setItem('mode' , value);
    window.location.reload();
  }

  ChangeMobileCode(value){
    this.DialingCode.next(value);
  }

  ChangeAssets(value){
    localStorage.setItem('asts' , JSON.stringify(value));
    this.Assets.next(value);
  }

  ChangeLoginSession(){
    if (localStorage.getItem('usr')) {
      // @ts-ignore
      const parsed = JSON.parse(localStorage.getItem('usr'));
      this.Loggedin.next(parsed)
    }
  }

  /*700b6298-ced4-48d6-a306-e97571064b2a*/


  getCoinData(page , limit , tag , sort , sort_dir){
    return   this.http.post(`${environment.baseUrl}ftftx/cmcApi/getLeatestList`, {
      limit: limit ,
      tag: tag,
      start: (page - 1)*limit + 1,
      sort : sort,
      sort_dir: sort_dir
    })
  }
  getSingleCoinData(id , slug){
    return   this.http.post(`${environment.baseUrl}ftftx/cmcApi/getMetaData`, {
      id: id,
      slug: slug
    })
  }
  getSingleCoinPrices(id ,slug){
    return   this.http.post(`${environment.baseUrl}ftftx/cmcApi/getOutletLeatest`, {id:id, slug: slug})
  }

  getGlobalData(){
    return this.http.post(`${environment.baseUrl}ftftx/cmcApi/getQuotesLeatest`, {})
  }

  OCHLData(id, slug , period , interval , count){
    return   this.http.post(`${environment.baseUrl}ftftx/cmcApi/getOhlcvHistorical`, {
      id:id,
      slug: slug,
      count: count,
      time_period: period,
      interval: interval
    })

/*    const headers = new HttpHeaders({'X-CMC_PRO_API_KEY' : '700b6298-ced4-48d6-a306-e97571064b2a'});
    return   this.http.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/historical?id=' + id + '&count=' + 200  + '&interval=' + interval, {headers})*/
  }

  GetPairs(id ,slug , category){
    return   this.http.post(`${environment.baseUrl}ftftx/cmcApi/getMarketPairs`, {
      id: id,
      slug: slug,
      category: category
    })
  }

  GetExchangesList(category , page , limit){
    return this.http.post(`${environment.baseUrl}ftftx/cmcApi/getExchangeLeatest`, {
      category: category,
      start: (page - 1)*limit + 1,
      limit: limit,
      sort: 'exchange_score',
      sort_dir: "desc"
    })
  }

  GetSingleExchange(id , slug){
    return this.http.post(`${environment.baseUrl}ftftx/cmcApi/getExchange`, {id : id})
  }

  GetExchangePairs(id, slug , category , limit){
    return this.http.post(`${environment.baseUrl}ftftx/cmcApi/getExchangeMarketPrice` , {
      id: id,
      limit: limit,
      slug: slug,
      category: category,
      start: 1
    })
  }

  GainersAndLosers(sc , limit){
    return this.http.post(`${environment.baseUrl}ftftx/cmcApi/getGainersAndLosers`, {sort_dir: sc , limit: limit, start: 1, sort:"percent_change_24h", time_period: '24h'})
  }

  GetTrendingCoins(limit){
    return this.http.post(`${environment.baseUrl}ftftx/cmcApi/getTradingLeatest`,
      {limit: limit, start : 1})
  }

  GlobalMetricsHistory(){
    return this.http.post(`${environment.baseUrl}ftftx/cmcApi/getQuotesHistorical`, {})
  }

  getUser(userId){
    return this.http.post(`${environment.baseUrl}ftftx/usersAPI/getUserDetails`, {userId})
  }

  GetFearandGreed(){
    return this.http.post(`${environment.baseUrl}ftftx/mainApi/fearAndGreed/details`, {})
  }

  GetCommunityData(){
    return this.http.post(`${environment.baseUrl}ftftx/topicApi/topicList`, {end: 5})
  }

  GetNews(query){
    return this.http.post(`${environment.baseUrl}ftftx/newsApi/news` , {
      language: 'en' ,
      country: 'us',
      q: query
    })
  }

  RegisterUser(data , type , dialcode){
    const DATA = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phone: dialcode + data.phone,
      service: "register",
      avatar: "avatar",
      userName: `username${Date.now()}`,
    };
    return this.http.post(`${environment.baseUrl}ftftx/usersAPI/saveUserInitially`, DATA)
  }

  VerifyUser(data){
    return this.http.post(`${environment.baseUrl}ftftx/usersAPI/varifyUser`, data)
  }

  LoginUser(data , type , dialcode){
    let fmData = {userId: '',password : data.password};
    if (type === 'email'){
      fmData.userId = data.email;
    }
    if (type === 'mobile'){
      fmData.userId = dialcode + data.phone;
    }
    return this.http.post(`${environment.baseUrl}ftftx/usersAPI/login`, fmData)
  }

  ForgotPassword(data , type , dialcode){
    const fmData = {
      email: type === 'email' ? data.email : '',
      phone: type === 'mobile' ? dialcode + data.phone : ''
    }

    return this.http.post(`${environment.baseUrl}ftftx/usersAPI/varifyEmail`, fmData)
  }

  changePassword(data , userId){
    const fmData = {
      userId,
      password:  data.password
    }

    return this.http.post(`${environment.baseUrl}ftftx/usersAPI/changePassword`, fmData)
  }

  GetCommunityFEED(){
    return this.http.post(`${environment.baseUrl}ftftx/topicApi/topicList`, {end: 5});
  }

  GetCommunityFeedSingle(postID){
    return this.http.post(`${environment.baseUrl}/ftftx/communityApi/savePost`, {"postId": postID});
  }

  PostCommunityFeed(data){
    return this.http.post(`${environment.baseUrl}/ftftx/communityApi/savePost`, data);
  }

  PostAComment(data){
    return this.http.post(`${environment.baseUrl}/ftftx/communityApi/saveComment`, data);
  }

  GetAllPosts(userID){
    return this.http.post(`${environment.baseUrl}/ftftx/communityApi/getAllPosts`, {"userId": userID});
  }

  verifyKyc(params){
    return this.http.post(`${environment.baseUrl}/ftftx/usersAPI/verifyKyc`, params)
  }

  SendingOTP(data){
    return this.http.post(`${environment.baseUrl2}verification/sendingOTP`, data);
  }

  VerifyingOTP(data){
    return this.http.post(`${environment.baseUrl2}verification/verifyingOTP`, data);
  }


  walletSubscription(data) {
    return this.http.post(`${environment.baseUrl2}verification/subscribe`, data);
  }

  createSubAccount(params) {
    return this.http.post(`${environment.baseUrl}ftftx/kyxAPI/createSubAccount`, params);
  }

  getSubAccountList(params) {
    return this.http.post(`${environment.baseUrl}ftftx/kyxAPI/getSubAccInfo`, params);
  }

  getCurrencies(params) {
    return this.http.post<any>(`${environment.baseUrl}ftftx/kyxAPI/getCurrencies`, params);
  }


  getSubAccBalance(params) {
    return this.http.post<any>(`${environment.baseUrl}ftftx/kyxAPI/getSubAccBalance`, params);
  }

  createDepositAddressForSubAccount(params) {
    return this.http.post<any>(`${environment.baseUrl}ftftx/kyxAPI/createDepositAddress`, params);
  }

  fundsTransfer(params) {
    return this.http.post<any>(`${environment.baseUrl}ftftx/kyxAPI/createTransfer`, params);
  }

}
