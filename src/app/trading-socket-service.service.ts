import { Injectable } from '@angular/core';
import * as Rx from "rxjs/Rx";
import {AnonymousSubject} from "rxjs/internal-compatibility";
import {Observable, Observer, Subject} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})


export class TradingSocketServiceService {

  public subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<any>;

  constructor() {
  }

  public async  getLiveprices(){

  }

  public connect(url): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer: any = {
      error: null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}
