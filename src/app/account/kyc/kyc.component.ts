import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountryDataService} from "../../country-data.service";
import {DataService} from "../../data.service";

@Component({
    selector: 'app-kyc',
    templateUrl: './kyc.component.html',
    styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit, OnDestroy {

    Countries: any = [];
    search = '';
    Page = 1;
    reference: string;
    LogginIn;
    KYC = {
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: '',
        nationality: '',
        issue_date: '',
        expiry_date: ''
    };
    SelectedCountry: any = '';
    SelectedNationality: any = '';
    SelectedDocumentType: any = '';
    DocumentTypes = [
        {caption: 'Government-Issued ID Card', value: 'id_card'},
        {caption: 'Driver\'s License', value: 'drv_license'},
        {caption: 'Passport', value: 'passport'},
    ];
    verificationUrl: string;

    constructor(private countries: CountryDataService,
                private api: DataService) {
        this.api.Loggedin.subscribe((res: any) => {
            if (!res[0]){
            } else {
                this.LogginIn = res;
            }
        });
        this.Countries = countries.countries;
    }

    ngOnInit(): void {
    }

    SelectedACountry(cont: any) {
        this.SelectedCountry = cont;
    }

    SelectedANationality(cont: any) {
        this.SelectedNationality = cont;
    }

    toModel(date: any) {
        return date ? date.year + "-" + ('0' + date.month).slice(-2)
            + "-" + ('0' + date.day).slice(-2) : null
    }

    continue() {
        const reference = `SP_REQUEST_${Math.random()}`;
        this.reference = reference;
        let payload = {
            reference,
            // callback_url: "http://localhost:4200/account/wallet",
            // redirect_url: `http://localhost:4200/account/status/${reference}`,
            country: this.SelectedNationality.alpha_2_code,
            verification_mode: "any",
        }
        payload['face'] = {
            proof: "",
            allow_offline: "1",
        };
        payload['document'] = {
            name: {
                first_name: this.KYC.first_name,
                middle_name: this.KYC.middle_name,
                last_name: this.KYC.last_name,
            },
            expiry_date: this.toModel(this.KYC.expiry_date),
            // expiry_date     : '2030-11-04' moment(this.KYC.expiry_date).format('yyyy-mm-dd');,
            issue_date: this.toModel(this.KYC.issue_date),
            allow_offline: '1',
            allow_online: '1',
            supported_types: ['id_card', 'passport'],
        }

        payload['background_checks'] = {
            name: {
                first_name: this.KYC.first_name,
                middle_name: this.KYC.middle_name,
                last_name: this.KYC.last_name,
            },
            dob: this.toModel(this.KYC.dob),
        }
        let token = btoa("S5fV2CqhGoytOIWphkCOVtKRaI2txxLYA610gSIfuBa2dX9bpZ1645618464:$2y$10$wiZONU5Iq/D.Z1NnRFTj5uxQ29N6wFtbSmTp8xJJEg0Pa44Y0ajBG"); //BASIC AUTH TOKEN
        fetch('https://api.shuftipro.com/',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + token
                },
                body: JSON.stringify(payload)
            })
            .then(function (response) {
                return response.json();
            }).then((data) => {
            if (data.event && data.event === 'request.pending') {
                this.Page = 2;
                this.verificationUrl = data.verification_url;
            }
        });
    }


    ngOnDestroy() {
        const payload = {
            reference : this.reference
        }
        let token = btoa("S5fV2CqhGoytOIWphkCOVtKRaI2txxLYA610gSIfuBa2dX9bpZ1645618464:$2y$10$wiZONU5Iq/D.Z1NnRFTj5uxQ29N6wFtbSmTp8xJJEg0Pa44Y0ajBG"); //BASIC AUTH TOKEN
        fetch('https://api.shuftipro.com/status',
            {
                method : 'post',
                headers : {
                    'Accept'        : 'application/json',
                    'Content-Type'  : 'application/json',
                    'Authorization' : 'Basic ' +token       // if access token then replace "Basic" with "Bearer"
                },
                body: JSON.stringify(payload)
            })
            .then(function(response) {
                return response.json();
            }).then((data) => {
                if (data.event === 'verification.accepted') {
                    this.verifyKyc();

                }
                console.log(data, 'data');
            return data;
        });
    }

    verifyKyc() {
        const params = {
            id: localStorage.getItem('userId'),
            reference: this.reference,
            userType: 'verified',
            status: 'verified',
            docMap: []
        }
        this.api.verifyKyc(params).subscribe((result) => {
            this.api.getUser(localStorage.getItem('userId')).subscribe((res) => {
                const usr = [
                    res.userDetails[0].firstName,
                    res.userDetails[0].lastName,
                    res.userDetails[0].userName,
                    res.userDetails[0].phone,
                    res.userDetails[0].email,
                    res.userDetails[0].trnNumber,
                    res.userDetails[0].status,
                    res.userDetails[0].userType,
                ];
                localStorage.setItem('usr' , JSON.stringify(usr));
                const parsed = JSON.parse(localStorage.getItem('usr') || '');
                this.api.Loggedin.next(parsed);
            })
        })
    }


}
