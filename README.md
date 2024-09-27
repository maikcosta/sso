# SSO
Prova de conceito de funcionalidade SSO Microsoft/Google

## Environment Config
Node v20.17.0

Angular 18

Gradle 8.10.1

Cordova 12.0.0 (cordova-lib@12.0.1)

## Dependencies

### Microsoft
"@azure/msal-angular": "^3.0.23",
"@azure/msal-browser": "^3.23.0",

### Google
"@capacitor/android": "^6.1.2",
"@codetrix-studio/capacitor-google-auth": "^3.4.0-rc.4"


### Check-packages 
$ npm -g ls --depth=0

├── @angular/cli@18.2.5
├── @ionic/cli@7.2.0
├── cordova@12.0.0
└── native-run@2.0.1 



# Criando projeto IONIC

ionic start 
Selecionar Angular
Defina o nome do projeto

## Testando o projeto ionic
ionic serve 



# Google

## Criar página login
ionic g pages login

## Ajustar redirecionamento em app-routing.module.ts
{
	path: '',
	redirectTo: 'login',
	pathMatch: 'full'  // Redireciona para a página de login quando a rota é vazia
},


## Criar botão no login.page.html
  <ion-button expand="full" (click)="loginWithGoogle()">
	<ion-icon name="logo-google"></ion-icon>
	Login com Google
  </ion-button>
## Criar função em login.page.ts

  async loginWithGoogle(){
    this.user = await this.authService.googleSignIn()
    console.log(this.user)
    if(this.user){
      this.router.navigate(['/home'])
    }
  }
  
## Criar serviço de autenticação

ionic g service service/auth
  

## Instalação do pacote codetrixstudio
npm i --save @codetrix-studio/capacitor-google-auth

## Atualização das dependencias do capacitor
npx cap update

## Criar projeto Google Console
https://console.cloud.google.com/
Será necessário antes da criação da credencial preencher a tela de consentimento com alguns dados são eles;
-Preencher com os dados da aplicação
-Inserir e-mail de suporte
-Liberar o escopo de visualização
-Depois das etapas acima publicar o app para produção!

### Criando credencias
Em API's & Serviços>Credenciais>Criar uma nova credencial OAuth ClientId
Selecionar o tipo de aplicação -> Android

Copiar o endereço do ClientID


## Ajustar o arquivo de auth.service.ts

import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, isPlatform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any
  constructor(private platform:Platform) { 
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize()
    }
    this.platform.ready().then(()=>{
      GoogleAuth.initialize()
    })
  }

  async googleSignIn() {
    this.user = await GoogleAuth.signIn();
    return await this.user;
  }
}


## Adicionar no capacitor.config.ts configurações do plugin GoogleAuth

plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '80325311987-i5b75sjlgp9sgfjn38ob4ga95snmuo8g.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },

## Adicionar meta tags no index.html
<meta name="google-signin-client_id" content="{your client id here}" />
<meta name="google-signin-scope" content="profile email" />

## Criar arquivos para build android
ionic cap add android

## Ajustar classe MainActivity.java em "android\app\src\main\java\io\ionic\pocsso\MainActivity.java"

package io.ionic.pocsso;
import android.ps.Budle;
import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        registerPlugin(GoogleAuth.class);
    }
}


## Ajustar string.xml em "android\app\src\main\res\values\strings.xml"

<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">sso</string>
    <string name="title_activity_main">sso</string>
    <string name="package_name">io.ionic.pocsso</string>
    <string name="custom_url_scheme">io.ionic.pocsso</string>
    <string name="server_client_id">80325311987-dmmdj7tl2n63rn58e535fjrg6tec9l8a.apps.googleusercontent.com</string>
</resources>



Fonte: https://www.npmjs.com/package/@codetrix-studio/capacitor-google-auth
Vídeo: https://www.youtube.com/watch?v=_BmbLZdJks8