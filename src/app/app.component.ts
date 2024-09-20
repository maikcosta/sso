import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router'; // Importe o Router


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private msalService: MsalService,
    private router: Router) {}

  ngOnInit() {
    this.msalService.handleRedirectObservable().subscribe({
      next: (result) => {
        console.log('Login result:', result);
        //this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
