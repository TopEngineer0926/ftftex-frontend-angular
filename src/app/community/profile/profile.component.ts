import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../community.component.scss']
})
export class ProfileComponent implements OnInit {

  Data = {
    profile_img: '',
    display_name: 'Batman',
    user_name: '@batman',
  };
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
