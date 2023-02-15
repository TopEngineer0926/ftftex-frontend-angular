import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('emailVerifyPop' , {static: false}) emailVerifyPop: ElementRef | undefined;

  loginType = 'email';
  Form;
  DialingCode;
  LoginErrors;
  OTP;
  OTPVerificationMessage = '';
  RegisterResponse
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
            this.RegisterResponse = res;
            console.log(this.RegisterResponse, 'this.RegisterResponse');
            this.modalService.open(this.emailVerifyPop, {ariaLabelledBy: 'modal-basic-title' , centered: true , backdrop: 'static'}).result.then((result) => {
            }, (reason) => {
            });
          }
        }
      }
    })
  }


  verifyUser() {
    const data = {
      "userId": this.RegisterResponse.userId,
      "email":this.Form.value.email,
      "pinCode": this.OTP,
      "service": 'change_password'
    };

    this.api.VerifyUser(data).subscribe((res: any) => {
      if (res.message === 'User verified successfully') {
        this.modalService.dismissAll();
        this.route.navigate(['/set-password'], {state: {userId: this.RegisterResponse.userId}})
      } else {
        this.OTPVerificationMessage = 'Invalid !';
      }

    }, () => {
      this.OTPVerificationMessage = 'Invalid !';
    });
  }

  openDialingCodes() {
    const modalRef = this.modalService.open(DialingCodesComponent, {centered: true});
  }

}
