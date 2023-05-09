import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { ScriptService } from "../services/script.service";

declare let simplexAsyncFunction: any;
@Component({
  selector: 'app-purchase-crypto',
  templateUrl: './purchase-crypto.component.html',
  styleUrls: ['./purchase-crypto.component.scss']
})

export class PurchaseCryptoComponent implements AfterViewInit {
  constructor(
    private _renderer2: Renderer2,
    private scriptService: ScriptService,
  ) {
  }

  ngAfterViewInit() {
    const scriptElement = this.scriptService.loadJsScript(this._renderer2, 'https://iframe.simplex-affiliates.com/form-sdk.js');
    scriptElement.onload = () => {
      // @ts-ignore
      window.simplex.createForm();
    }
    scriptElement.onerror = () => {
      console.log('Could not load the Google API Script!');
    }
  }
}
