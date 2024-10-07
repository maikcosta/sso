// src/app/process-auth/process-auth.page.ts

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Component({
  selector: 'app-process-auth',
  templateUrl: './process-auth.page.html',
  styleUrls: ['./process-auth.page.scss'],
})
export class ProcessAuthPage implements OnInit {
  constructor(private storage: Storage, private router: Router, private http: HTTP) {}

  async ngOnInit() {
    // Recuperar o código de autorização do armazenamento
    const code = await this.storage.get('authCode');
    if (code) {
      // Trocar o código por tokens
      await this.exchangeCodeForToken(code);
      // Limpar o código de autorização armazenado
      await this.storage.remove('authCode');
    } else {
      console.error('Nenhum código de autorização encontrado.');
      // Redirecionar para a página de login ou exibir uma mensagem de erro
      this.router.navigate(['/home']);
    }
  }

// process-auth.page.ts

private async exchangeCodeForToken(code: string) {
  const codeVerifier = await this.storage.get('codeVerifier');
  const clientId = 'b67fd244-5a97-4b71-9c21-dbc8a995f815';
  const tenantId = 'b545925d-9548-4587-889b-a1b79b107804';
  const redirectUri = 'msauth://io.ionic.starter/M61nf+aC69kCXmFY1ejcX83rDNc=';
  const scopes = 'openid profile email offline_access user.read';

  //https://graph.microsoft.com
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const body = {
    client_id: clientId,
    scope: scopes,
    code: code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
    code_verifier: codeVerifier,
  };

  try {
    const response = await this.http.post(tokenUrl, body, {
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const data = JSON.parse(response.data);
    console.log('Tokens recebidos:', data);

    const accessToken = data.access_token; // Obtido após a troca de tokens
    await this.storage.set('accessToken', accessToken);

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await this.http.get('https://graph.microsoft.com/v1.0/me', {}, headers);
      const userInfo = JSON.parse(response.data);
      await this.storage.set('userInfo', userInfo);
      console.log('Informações do usuário:', userInfo);
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
    }

    if (data.error) {
      console.error('Erro ao trocar o código por tokens:', data.error_description);
      this.router.navigate(['/login']);
    } else {
      await this.storage.set('authTokens', data);
      this.router.navigate(['/home']);
    }
  } catch (error) {
    console.error('Erro ao trocar o código por tokens:', error);
    this.router.navigate(['/login']);
  }
}
}
