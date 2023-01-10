import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-coin-select',
  templateUrl: './coin-select.component.html',
  styleUrls: ['./coin-select.component.scss']
})
export class CoinSelectComponent implements OnInit {
  @Input() AllPairs;
  @Input() AllPairsPrice;
  s_tableFilter  = '';
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  navigate(baseAsset: any, quoteAsset: any) {
    window.location.href = 'trade/'+ baseAsset+'_'+quoteAsset;
  }
}
