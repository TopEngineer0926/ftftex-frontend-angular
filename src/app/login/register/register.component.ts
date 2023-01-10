import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DialingCodesComponent} from "../dialing-codes/dialing-codes.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registrationDone' , {static: false}) registrationDone: ElementRef | undefined;
  @ViewChild('emailVerifyPop' , {static: false}) emailVerifyPop: ElementRef | undefined;
  @ViewChild('mobileVerifyPop' , {static: false}) mobileVerifyPop: ElementRef | undefined;

  RegisterType = 'email';
  OTP;
  Form;
  DialingCode;
  Verifications = {
    email: false,
    phone: false
  };
  RegisterResponse;
  OTPVerificationMessage = '';
  Creds;
  Errors;
  constructor(private api: DataService , private modalService: NgbModal , private route: Router) {

    this.Form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('',  Validators.required),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl('' , Validators.required)
    });

  }

  ngOnInit(): void {
    this.api.DialingCode.subscribe((res) => {
      this.DialingCode = res;
    })
  }

  switchRegisterType(value){
    this.RegisterType = value;
    this.Form.value.email = '';
    this.Form.value.phone = '';
  }

  register(){
    this.OTPVerificationMessage = '';
    this.api.RegisterUser(this.Form.value , this.RegisterType , this.DialingCode.dialCode).subscribe((res: any) => {
      this.RegisterResponse = res;
      console.log(this.RegisterResponse);

      if (!res.result.exist) {
        this.api.SendingOTP({"userid": res.result.userId, "type":"email", "email": this.Form.value.email}).subscribe((res2: any) => {
          if (this.RegisterType === 'email'){
            this.modalService.open(this.emailVerifyPop, {ariaLabelledBy: 'modal-basic-title' , centered: true , backdrop: 'static'}).result.then((result) => {
            }, (reason) => {
            });
          }
        });

      } else {
        this.Errors = "Email/Mobile Already Exist !"
      }

    })
  }

  VerifyOTP(value) {
    this.OTPVerificationMessage = '';
    /*const data = {
      userId: this.RegisterResponse.result.userId,
      pinCode: this.OTP
    };*/

    const data = {
      "userid": this.RegisterResponse.result.userId,
      "type":"email",
      "OTP": this.OTP
    };

    this.api.VerifyingOTP(data).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.modalService.open(this.registrationDone, {ariaLabelledBy: 'modal-basic-title' , centered: true}).result.then((result) => {
      }, (reason) => {
        this.route.navigate(['/login']);
      });
    }, () => {
      this.OTPVerificationMessage = 'Invalid !';
    });

    /*this.api.VerifyUser(data).subscribe((res: any) => {
      if (res.Message === 'User verified successfully') {
        this.modalService.dismissAll();
        this.modalService.open(this.registrationDone, {ariaLabelledBy: 'modal-basic-title' , centered: true}).result.then((result) => {
        }, (reason) => {
          this.route.navigate(['/login']);
        });
      }else {
        this.OTPVerificationMessage = 'Invalid !';
      }

    });*/

  }

  open(content , type) {
    this.OTP = '';
    this.modalService.open( content , {ariaLabelledBy: 'modal-basic-title' , backdrop: 'static', centered: true}).result.then((result) => {

    }, (reason) => {

    });
  }

  openDialingCodes(){
    const modalRef = this.modalService.open(DialingCodesComponent , {centered: true});
  }
}
