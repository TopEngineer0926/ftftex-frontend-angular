import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountryDataService} from "../../country-data.service";

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

    constructor(private countries: CountryDataService) {
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
            }).then(function(data) {
                if (data.event === 'verification.accepted') {
                    alert('stea');
                }
                console.log(data, 'data');
            return data;
        });
    }

}
