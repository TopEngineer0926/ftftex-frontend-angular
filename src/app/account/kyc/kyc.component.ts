import { Component, OnInit } from '@angular/core';
import {CountryDataService} from "../../country-data.service";

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {

  Countries: any = [];
  search= '';
  Page = 1;

  KYC = {
    country_of_issue: '',
    nationality: '',
    document_type: '',
    document: {
      front: '',
      back: ''
    },
    selfi: ''
  };
  SelectedCountry: any = '';
  SelectedNationality: any = '';
  SelectedDocumentType: any = '';
  DocumentTypes = [
    {caption : 'Government-Issued ID Card' , value : 'id_card'},
    {caption : 'Driver\'s License' , value : 'drv_license'},
    {caption : 'Passport' , value : 'passport'},
  ];
  verificationUrl: string;

  constructor(private countries: CountryDataService) {
    this.Countries = countries.countries;
  }

  ngOnInit(): void {
//     const reference = `SP_REQUEST_${Math.random()}`;
//     let payload = {
//       reference,
//       callback_url      : "https://yourdomain.com/profile/sp-notify-callback",
//       redirect_url      : "https://yourdomain.com/site/sp-redirect",
//       country           : "AM",
//       language          : "EN",
//       verification_mode : "any",
//       // ttl               : 60,
//     }
// //Use this key if you want to perform face verification
//     payload['face'] = {
//       proof          : "",
//       allow_offline  : "1",
//     };
// //Use this key if you want to perform document verification
//     payload['document'] = {
//       name : {
//         first_name  : 'Artur',
//         last_name   : 'Gyulabyan',
//       },
//       expiry_date     : '2030-11-04',
//       issue_date      : '2020-11-04',
//       allow_offline   : '1',
//       allow_online    : '1',
//       supported_types : ['id_card','passport'],
//     }
// //Use this key if you want to perform address verification
//     payload['address'] = {
//       name : {
//         first_name  : 'Your first name',
//         middle_name : 'Your middle name',
//         last_name   : 'You last name',
//         fuzzy_match : '1'
//       },
//       proof           : '',
//       full_address    : 'your address',
//       address_fuzzy_match : '1',
//       issue_date : '2015-10-10',
//       supported_types : ['utility_bill','passport','bank_statement']
//     }

// //Use this key if you want to perform background checks verification
//     payload['background_checks'] = {
//       name : {
//         first_name  : 'Your first name',
//         middle_name : 'Your middle name',
//         last_name   : 'You last name',
//       },
//       dob    : '1994-01-01',
//     }
//Use your Shufti Pro account client id and secret key
//     var token = btoa("S5fV2CqhGoytOIWphkCOVtKRaI2txxLYA610gSIfuBa2dX9bpZ1645618464:$2y$10$wiZONU5Iq/D.Z1NnRFTj5uxQ29N6wFtbSmTp8xJJEg0Pa44Y0ajBG"); //BASIC AUTH TOKEN
// if Access Token
//var token = "YOUR_ACCESS_TOKEN";
//Dispatch request via fetch API or with whatever else which best suits for you
//     fetch('https://api.shuftipro.com/',
//         {
//           method : 'post',
//           headers : {
//             'Accept'        : 'application/json',
//             'Content-Type'  : 'application/json',
//             'Authorization' : 'Basic ' +token       // if access token then replace "Basic" with "Bearer"
//           },
//           body: JSON.stringify(payload)
//         })
//         .then(function(response) {
//           console.log(response, 'response');
//           return response.json();
//         }).then((data) => {
//       if (data.event && data.event === 'request.pending') {
//         this.verificationUrl = data.verification_url;
//         console.log(this.verificationUrl, 'this.verificationUrl');
//         // createIframe(data.verification_url)
//       }
//     });

//     setInterval(() => {
//       var payload = {
//         reference
//       }
//
// //Use your Shufti Pro account client id and secret key
//       var token = btoa("S5fV2CqhGoytOIWphkCOVtKRaI2txxLYA610gSIfuBa2dX9bpZ1645618464:$2y$10$wiZONU5Iq/D.Z1NnRFTj5uxQ29N6wFtbSmTp8xJJEg0Pa44Y0ajBG"); //BASIC AUTH TOKEN
// // if Access Token
// //var token = "YOUR_ACCESS_TOKEN";
// //Dispatch request via fetch API or with whatever else which best suits for you
//       fetch('https://api.shuftipro.com/status',
//           {
//             method : 'post',
//             headers : {
//               'Accept'        : 'application/json',
//               'Content-Type'  : 'application/json',
//               'Authorization' : 'Basic ' +token       // if access token then replace "Basic" with "Bearer"
//             },
//             body: JSON.stringify(payload)
//           })
//           .then(function(response) {
//             return response.json();
//           }).then(function(data) {
//         return data;
//       });
//     }, 1000)

  }

  SelectedACountry(cont: any) {
    this.SelectedCountry = cont;
  }

  SelectedANationality(cont: any) {
    this.SelectedNationality = cont;
  }

  switchDocumentType(tp: { caption: string; value: string }) {
    this.SelectedDocumentType = tp;
    this.KYC.document_type = tp.value;
  }
}
