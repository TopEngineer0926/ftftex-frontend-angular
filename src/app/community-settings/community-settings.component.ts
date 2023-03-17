import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-community-settings',
  templateUrl: './community-settings.component.html',
  styleUrls: ['./community-settings.component.scss']
})
export class CommunitySettingsComponent implements OnInit {

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
