import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2
} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-buy-crypto',
  templateUrl: './buy-crypto.component.html',
  styleUrls: ['./buy-crypto.component.scss']
})
export class BuyCryptoComponent implements OnInit , AfterViewInit {

  loaded = false;
  constructor(@Inject(DOCUMENT) private document) { }

  ngOnInit(): void {
    const m = this.document.createElement('script');
    m.type = 'text/javascript';
    m.src = `https://iframe.sandbox.test-simplexcc.com/form.js`;
    this.document.body.appendChild(m);
  }


  ngAfterViewInit():void {
    setTimeout(() => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.text = `window.simplex.createForm();window.simplex.updateCryptoCurrency("BTC");`;

      this.document.body.appendChild(s);
    }, 2000);

  }


}
