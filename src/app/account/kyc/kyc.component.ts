import {Component, OnInit} from '@angular/core';
import {CountryDataService} from "../../country-data.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment/moment";

@Component({
    selector: 'app-kyc',
    templateUrl: './kyc.component.html',
    styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {

    Countries: any = [];
    search = '';
    Page = 1;

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

    onDateChange(date: NgbDateStruct, type: string) {
        console.log(date, 'date');
        // this.KYC[type] = new Date(`${date.month}/${date.day}/${date.year}`);
    }


    continue() {
        const reference = `SP_REQUEST_${Math.random()}`;
        let payload = {
            reference,
            // callback_url: "http://localhost:4200/account/wallet",
            // redirect_url: "http://localhost:4200/account/wallet",
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
            expiry_date: moment(this.KYC.expiry_date).format('yyyy-mm-DD'),
            // expiry_date     : '2030-11-04' moment(this.KYC.expiry_date).format('yyyy-mm-dd');,
            issue_date: moment(this.KYC.issue_date).format('yyyy-mm-DD'),
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
            dob: moment(this.KYC.dob).format('yyyy-mm-DD'),
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
}
