import {Component, OnInit} from '@angular/core';
import {DataService} from "./data.service";
import {TranslateCompiler, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ftftx';

  constructor(private api: DataService , private translate: TranslateService) {
    if (localStorage.getItem('lang')){
      // @ts-ignore
      this.translate.use(localStorage.getItem('lang'));
    } else {
      this.translate.use('en');
      localStorage.setItem('lang' , 'en')
    }

  }


  ngOnInit(): void {
  }
}
