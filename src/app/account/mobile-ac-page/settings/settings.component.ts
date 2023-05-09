import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../mobile-ac-page.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor( private translate: TranslateService) { }

  ngOnInit(): void {
  }

  changeLanguage(val) {
    this.translate.use(val);
    localStorage.setItem('lang' , val)
  }

}
