import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  selectedCoin: string;
  constructor() { }

  ngOnInit(): void {
  }

  selectCoin() {
    this.selectedCoin = 'BTC'

  }

}
