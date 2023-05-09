import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  GlobalData;
  LoggedIn = {0: ''};
  isMobile = false;
  Theme = 'light';
  constructor(private api: DataService , private translate: TranslateService) {
    this.api.Theme.subscribe(res => {
      this.Theme = res;
      if (res === 'light'){
        document.body.classList.remove('dark-theme');
      } else {
        document.body.classList.add('dark-theme');
      }
    })
  }

  ngOnInit(): void {
    this.api.getGlobalData().subscribe((res: any)=>{
      this.GlobalData = JSON.parse(res.response['Result: '])?.data;
    });
    this.api.Loggedin.subscribe((res: any) => {
        this.LoggedIn = res;
    });
    this.isMobile = this.api.isMobile;
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }

  changeLanguage(val) {
    this.translate.use(val);
    localStorage.setItem('lang' , val)
  }

  toggleDarkTheme(): void {
    if (this.Theme === 'light'){
      this.api.changeTheme('dark');
    } else {
      this.api.changeTheme('light');
    }

  }
}
