import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isMobile = false;
  Theme = 'dark';
  constructor(private api: DataService) {
    this.isMobile = this.api.isMobile;
     this.api.Theme.subscribe(res => {
       this.Theme = res;
    })
  }

  ngOnInit(): void {
  }

}
