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

  async loginWithMicrosoft() {
    try {
      const result = await this.msalService.instance.handleRedirectPromise();
  
      if (result) {
        console.log('Redicionamento com sucesso!', result);
      } else {
        const accounts = this.msalService.instance.getAllAccounts();
        if (accounts.length === 0) {
          this.msalService.loginRedirect({
            scopes: ['user.read'],
            extraQueryParameters: { useEmbeddedWebView: 'true' }
          });
        } else {
          console.log('Usuário já está logado:', accounts);
        }
      }
    } catch (error) {
      console.error('Erro ao processar redirecionamento ou login:', error);
    }
  }

}
