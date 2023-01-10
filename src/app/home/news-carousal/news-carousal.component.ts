import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataService} from "../../data.service";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'app-news-carousal',
  templateUrl: './news-carousal.component.html',
  styleUrls: ['./news-carousal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsCarousalComponent implements OnInit {

  NewsDataAll;
  NewsFilter = 'bitcoin';
  isMobile = false;
  pageIndex = 3;
  constructor(private api: DataService) { }

  ngOnInit(): void {
    this.api.GetNews(this.NewsFilter).subscribe((res: any) => {
      this.NewsDataAll = JSON.parse(res.news).results;
    }, () => {} , () => {
      this.NewsDataAll = this.NewsDataAll.filter(x => x.image_url);
      let pg = this.NewsDataAll.length / 6;
      pg = Math.ceil(pg);
      this.pageIndex = pg;
      for (let x of this.NewsDataAll){
        try {
          x.image_url = x.image_url.replace('http://', 'https://');
        } catch (e) {

        }
      }
    /*  this.NewsDataAll = this.NewsDataAll.slice(15);*/
    });
    this.isMobile = this.api.isMobile;
  }

  setDefaultPic(event) {
    event.target.src = 'assets/images/news-place-holder.png';
  }

}
