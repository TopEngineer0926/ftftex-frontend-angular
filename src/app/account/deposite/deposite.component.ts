import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {TradingDataServiceService} from "../../trading-data-service.service";

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.scss']
})
export class DepositeComponent implements OnInit {

  constructor(private api: TradingDataServiceService) { }

  ngOnInit(): void {

  }


}
