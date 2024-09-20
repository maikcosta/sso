import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private msalService: MsalService) { }

  ngOnInit() {
  }

  loginWithMicrosoft() {
    this.msalService.loginRedirect();
  }

}
