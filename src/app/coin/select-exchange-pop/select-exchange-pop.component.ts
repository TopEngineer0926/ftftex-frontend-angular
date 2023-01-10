import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-select-exchange-pop',
  templateUrl: './select-exchange-pop.component.html',
  styleUrls: ['./select-exchange-pop.component.scss']
})
export class SelectExchangePopComponent implements OnInit {
  @Input() data;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
