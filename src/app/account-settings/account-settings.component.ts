import {Component, OnInit} from '@angular/core';
import {NgbAccordionConfig} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

    selectedLang = localStorage.getItem('lang');
    LogginIn;

    constructor(private api: DataService,
                private route: Router,
                private translate: TranslateService,
                config: NgbAccordionConfig) {
        config.closeOthers = true;
    }


    ngOnInit(): void {
        this.api.Loggedin.subscribe((res: any) => {
            if (!res[0]) {
                this.route.navigate(['/login']);
            } else {
                this.LogginIn = res;
            }
        })
    }

    changeLanguage(val) {
        this.translate.use(val);
        localStorage.setItem('lang', val);
        this.selectedLang = val;
    }

}
