import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-order-status-pop',
  templateUrl: './order-status-pop.component.html',
  styleUrls: ['./order-status-pop.component.scss']
})
export class OrderStatusPopComponent implements OnInit {

  Theme = 'dark';
  constructor(public activeModal: NgbActiveModal, private api: DataService) {
    this.api.Theme.subscribe(res => {
      this.Theme = res;
    })
  }

  ngOnInit(): void {
  }

}
