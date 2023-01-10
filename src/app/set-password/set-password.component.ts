import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  Form;
  LoginErrors = '';
  userId;
  constructor(private api: DataService , private modalService: NgbModal , private route: Router) {
    this.Form = new FormGroup({
      password: new FormControl('' , Validators.required),
    });
    this.userId = this.route.getCurrentNavigation()?.extras.state?.['userId'];
    if (!this.userId) {
      this.route.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  setPassword(){
    this.api.changePassword(this.Form.value, this.userId).subscribe({
      next: (res: any) => {
        if (res.message) {
          this.route.navigate(['/login']);
        }
      }
    })
  }
}
