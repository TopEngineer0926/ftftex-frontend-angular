import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  links = [
  { title: 'Account Settings', fragment: '/account-settings' },
  { title: 'Two', fragment: 'two' }
  ];
  
  constructor(public route: ActivatedRoute,
  private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onLogout() {
    const modalRef = this.modalService.open(LogoutComponent , {centered: true});
  }
}
