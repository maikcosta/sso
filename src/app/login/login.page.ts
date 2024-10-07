import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user:any = null;
  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private storage: Storage,
    private router: Router,
    private authService:AuthService
  ) {}

  async loginWithMicrosoft() {
    const clientId = 'b67fd244-5a97-4b71-9c21-dbc8a995f815';
    const tenantId = 'b545925d-9548-4587-889b-a1b79b107804';
    const redirectUri = 'msauth://io.ionic.starter/M61nf+aC69kCXmFY1ejcX83rDNc=';
    const scopes = 'openid profile email offline_access user.read';
    const responseType = 'code';
    const responseMode = 'query';
  
    // Gerar code_verifier e code_challenge
    const codeVerifier = this.generateRandomString(128);
    console.log('Code verifier: ' + codeVerifier);
    await this.storage.set('codeVerifier', codeVerifier);
  
    const codeChallenge = this.base64URLEncode(sha256.arrayBuffer(codeVerifier));
    console.log('Code challenge: ' + codeChallenge);
  
    // Construir a URL de autenticação incluindo code_challenge e code_challenge_method
    const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?` +
      `client_id=${clientId}` +
      `&response_type=${responseType}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_mode=${responseMode}` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&code_challenge=${encodeURIComponent(codeChallenge)}` +
      `&code_challenge_method=S256`;
  
    console.log('Iniciando fluxo de autenticação');
    console.log('URL de Autenticação:', authUrl);
  
    if (this.platform.is('cordova')) {
      const browser = this.iab.create(
        authUrl,
        '_blank',
        'location=yes,clearsessioncache=yes,clearcache=yes'
      );
  
      browser.on('loadstart').subscribe((event) => {
        console.log('loadstart URL:', event.url);
        if (event.url.startsWith(redirectUri)) {
          browser.close();
          this.handleAuthCode(event.url);
        }
      });
  
      browser.on('loaderror').subscribe((event) => {
        console.log('loaderror URL:', event.url);
        if (event.url.startsWith(redirectUri)) {
          browser.close();
          this.handleAuthCode(event.url);
        } else {
          console.error('Erro ao carregar a página de login:', event);
          browser.close();
        }
      });
    } else {
      // Para navegadores web, redirecionar diretamente
      window.location.href = authUrl;
    }
  }

  async loginWithGoogle(){
    this.user = await this.authService.googleSignIn()
    console.log(this.user)
    if(this.user){
      this.router.navigate(['/home'])
    }
  }
  

   private handleAuthCode(url: string) {
    console.log('URL recebida no handleAuthCode:', url);
    const code = this.getParameterByName('code', url);
    if (code) {
      console.log('Código de autorização extraído:', code);
      this.storage.set('authCode', code);
      this.router.navigate(['/process-auth']);
    } else {
      console.error('Nenhum código de autorização encontrado na resposta.');
    }
  }
  

  // Método auxiliar para extrair parâmetros da URL
  private getParameterByName(name: string, url: string): string | null {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[#?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
      return null;
    } else if (!results[2]) {
      return '';
    } else {
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  }  

  private generateRandomString(length: number): string {
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  }
  
  private base64URLEncode(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }  
}
