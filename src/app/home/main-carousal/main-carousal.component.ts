import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import {DataService} from "../../data.service";
import {SelectExchangePopComponent} from "../../coin/select-exchange-pop/select-exchange-pop.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
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
    {type: 'image' , image: 'assets/images/slides/f2.png' , link: ''},
    {type: 'video' , image: 'assets/images/slides/v1.png' , link: 'https://www.youtube.com/watch?v=EJzB_Fa27ko'},
    {type: 'video' , image: 'assets/images/slides/v2.png' , link: 'https://www.youtube.com/watch?v=FExp9YuTzbY'},
    {type: 'image' , image: 'assets/images/slides/f4.png' , link: ''},
    {type: 'video' , image: 'assets/images/slides/v3.png' , link: 'https://www.youtube.com/watch?v=KHm0uUPqmVE'},
    // {type: 'image' , image: 'assets/images/slides/f1.png' , link: ''},
    {type: 'image' , image: 'assets/images/slides/f3.png' , link: ''},
  ];

  SlidesMB = [
    {type: 'image' , image: 'assets/images/slides/f2.png' , link: ''},
    {type: 'video' , image: 'assets/images/slides/v2.png' , link: 'https://www.youtube.com/watch?v=FExp9YuTzbY'},
    {type: 'image' , image: 'assets/images/slides/f4.png' , link: ''},
    // {type: 'image' , image: 'assets/images/slides/f1.png' , link: ''},
    {type: 'image' , image: 'assets/images/slides/f3.png' , link: ''},
  ];

  isMobile = false;
  constructor(private api: DataService, private modalService: NgbModal) {
    this.isMobile = this.api.isMobile;
  }

  ngOnInit(): void {
    this.api.Loggedin.subscribe((res: any) => {
      this.LoggedIn = res;
    })
  }


  openAgg() {
    const modalRef = this.modalService.open(SelectExchangePopComponent , {centered: true});
    modalRef.componentInstance.data = {
      "url": "1/bitcoin",
      "coin": "BTC"
    };

  }
}
