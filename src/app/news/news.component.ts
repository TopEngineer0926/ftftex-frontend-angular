import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  NewsData;
  NewsDataAll;
  NewsFilter = 'crypto';
  Country = 'ae';
  SelectedNews;
  TopNews;
  NoImageNews;
  constructor(private api: DataService) { }

  ngOnInit(): void {
    this.api.GetNews(this.NewsFilter).subscribe((res: any) => {
      this.NewsDataAll = JSON.parse(res.news).results;
      this.NewsData = JSON.parse(res.news).results;
      this.NoImageNews = JSON.parse(res.news).results;
      console.log(this.NoImageNews);

      console.log(this.NewsData);
    }, () => {} , () => {
      this.NewsDataAll = this.NewsData.filter(x => x.image_url);
      this.NewsData = this.NewsData.filter(x => x.image_url);
      this.NoImageNews = this.NoImageNews.filter(x => x.image_url === null);

      this.SelectedNews = this.NewsData[0];

      for (let x of this.NewsDataAll){
        try {
          x.image_url = x.image_url.replace('http://', 'https://');
        } catch (e) {

        }

      }

      for (let x of this.NewsData){
        try {
          x.image_url = x.image_url.replace('http://', 'https://');
        } catch (e) {

        }
      }

    });
  }



  syncData(){
    this.api.GetNews(this.NewsFilter).subscribe((res: any) => {
      this.NewsData = JSON.parse(res.news).results;
      this.NewsData = this.NewsData.filter(x => x.image_url);
      this.SelectedNews = this.NewsData[0];

      for (let x of this.NewsData){
        try {
          x.image_url = x.image_url.replace('http://', 'https://');
        } catch (e) {

        }
      }

    })
  }

  selectOneNews(value) {
    this.SelectedNews = value;
  }

  changeTab(value: string) {
    this.NewsFilter = value;
    this.syncData();
  }

  setDefaultPic(event) {
    event.target.src = 'assets/images/news-place-holder.png';
  }
}
