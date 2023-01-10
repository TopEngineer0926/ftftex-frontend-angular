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

  switchDocumentType(tp: { caption: string; value: string }) {
    this.SelectedDocumentType = tp;
    this.KYC.document_type = tp.value;
  }
}
