import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialingCodesComponent} from "../login/dialing-codes/dialing-codes.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loginType = 'email';
  Form;
  DialingCode;
  LoginErrors;

  constructor(private api: DataService, private modalService: NgbModal, private route: Router) {
    this.Form = new FormGroup({
      email: new FormControl(''),
      phone: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.api.DialingCode.subscribe(res => {
      this.DialingCode = res;
    })
  }

  switchLoginType(value) {
    this.loginType = value;
  }

  login() {
    this.api.ForgotPassword(this.Form.value, this.loginType, this.DialingCode.dialCode).subscribe({
      next: (res: any) => {
        console.log(res, 'res');
        if (res.message === 'not found') {
          if (this.loginType === 'mobile') {
            this.LoginErrors = "Invalid mobile number!";
          }
          if (this.loginType === 'email') {
            this.LoginErrors = "Invalid email!";
          }
        } else {
          if (res.userId) {
            this.route.navigate(['/set-password'], {state: {userId: res.userId}})
          }
        }
      }
    })





    // this.api.LoginUser(this.Form.value, this.loginType, this.DialingCode.dialCode).subscribe((res: any) => {
    //   if (res.message === 'User not found, Please Sign-up') {
    //     if (this.loginType === 'mobile') {
    //       this.LoginErrors = "Invalid mobile number or password !";
    //     }
    //     if (this.loginType === 'email') {
    //       this.LoginErrors = "Invalid email or password !";
    //     }
    //
    //   } else {
    //     if (res['user-details']) {
    //       localStorage.setItem('usr', JSON.stringify(res['user-details']));
    //       if (JSON.stringify(res['user-details'][3] === 'test@ftftex.com')) {
    //         this.api.ChangeAssets({
    //           "ordered": [],
    //           "coins": {
    //             "usdt": 1000,
    //             "eth": 0,
    //             "bnb": 0,
    //             "btc": 0,
    //             "sol": 0,
    //             "ada": 0,
    //             "dot": 0,
    //             "doge": 0,
    //             "shib": 0,
    //             "matic": 0,
    //             "uni": 0,
    //             "ltc": 0,
    //             "trx": 0,
    //             "xrp": 0,
    //           }
    //         });
    //       }
    //       this.api.ChangeLoginSession();
    //       this.route.navigate(['/']);
    //     } else {
    //       this.LoginErrors = res.message;
    //     }
    //   }
    // })


  }

  openDialingCodes() {
    const modalRef = this.modalService.open(DialingCodesComponent, {centered: true});
  }

}
