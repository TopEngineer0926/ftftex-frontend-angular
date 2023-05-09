import {Inject, Injectable, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {

  }

  loadJsScript(renderer: Renderer2, src: string, text?: string): HTMLScriptElement {
    const script = renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    if (text) {
      script.text = text;
    }
    renderer.appendChild(this.document.body, script);
    return script;
  }
}
