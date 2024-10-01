import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:any
  constructor(private msalService: MsalService, private authService:AuthService, private router:Router) { }

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
  async loginWithGoogle(){
    this.user = await this.authService.googleSignIn()
    console.log(this.user)
    if(this.user){
      this.router.navigate(['/home'])
    }
  }

}
