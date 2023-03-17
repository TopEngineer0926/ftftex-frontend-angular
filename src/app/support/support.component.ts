import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

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
