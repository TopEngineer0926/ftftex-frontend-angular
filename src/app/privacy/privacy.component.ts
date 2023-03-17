import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  LogginIn;
  constructor(private api: DataService , private route: Router) { }

  ngOnInit(): void {
    this.api.Loggedin.subscribe((res: any) => {
      if (!res[0]){
        this.route.navigate(['/login']);
      } else {
        this.LogginIn = res;
      }
    })
  }

}
