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
  user:any = null;
  constructor(private msalService: MsalService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  async loginWithMicrosoft() {
    console.log('Info user ->', this.user);
    try {
      const result = await this.msalService.instance.handleRedirectPromise();
  
      if (result) {
        console.log('Redirecionamento com sucesso!', result);
        this.authService.microsoftSignIn(result.account); // Salva os dados do Microsoft
        this.router.navigate(['/home']);
      } else {
        const user = this.msalService.instance.getAllAccounts();
        if (user.length === 0) {
          this.msalService.loginRedirect({
            scopes: ['user.read'],
            extraQueryParameters: { useEmbeddedWebView: 'true' }
          });
        } else {
          console.log('Usuário já está logado:', user);
          this.authService.microsoftSignIn(user[0]); // Se já estiver logado, salva os dados
          this.router.navigate(['/home']);
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
