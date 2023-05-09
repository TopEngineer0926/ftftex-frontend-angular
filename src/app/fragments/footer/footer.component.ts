import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isMobile = false;
  constructor(private api: DataService) { }

  ngOnInit(): void {
    this.isMobile = this.api.isMobile;
  }

}
