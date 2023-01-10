import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import {DataService} from "../../data.service";
SwiperCore.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'app-main-carousal',
  templateUrl: './main-carousal.component.html',
  styleUrls: ['./main-carousal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainCarousalComponent implements OnInit {

  LoggedIn = {0: ''};
  Slides = [
    {type: 'image' , image: 'assets/images/slides/1.svg' , link: ''},
    {type: 'video' , image: 'assets/images/slides/v1.png' , link: 'https://www.youtube.com/watch?v=EJzB_Fa27ko'},
    {type: 'video' , image: 'assets/images/slides/v2.png' , link: 'https://www.youtube.com/watch?v=FExp9YuTzbY'},
    {type: 'image' , image: 'assets/images/slides/2.svg' , link: ''},
    {type: 'video' , image: 'assets/images/slides/v3.png' , link: 'https://www.youtube.com/watch?v=KHm0uUPqmVE'},
    {type: 'image' , image: 'assets/images/slides/3.svg' , link: 'https://blog.ftftx.com/'},
    {type: 'image' , image: 'assets/images/slides/4.svg' , link: ''},
  ];

  SlidesMB = [
    {type: 'image' , image: 'assets/images/slides/1.svg' , link: ''},
    {type: 'video' , image: 'assets/images/slides/v2.png' , link: 'https://www.youtube.com/watch?v=FExp9YuTzbY'},
    {type: 'image' , image: 'assets/images/slides/2.svg' , link: ''},
    {type: 'image' , image: 'assets/images/slides/3.svg' , link: 'https://blog.ftftx.com/'},
    {type: 'image' , image: 'assets/images/slides/4.svg' , link: ''},
  ];

  isMobile = false;
  constructor(private api: DataService) {
    this.isMobile = this.api.isMobile;
  }

  ngOnInit(): void {
    this.api.Loggedin.subscribe((res: any) => {
      this.LoggedIn = res;
    })
  }

}
