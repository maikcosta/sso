# SSO
Prova de conceito de funcionalidade SSO Microsoft/Google

## Environment Config
Node v20.17.0

Angular 18

Gradle 8.10.1

Cordova 12.0.0 (cordova-lib@12.0.1)

## Dependencies

### Microsoft
```
"@azure/msal-angular": "^3.0.23",
"@azure/msal-browser": "^3.23.0",
```

# Criando projeto IONIC

ionic start 
Selecionar Angular
Defina o nome do projeto

## Testando o projeto ionic
```
ionic serve 
```

# Google

## WEB

![Auth-SSO-Google](https://github.com/user-attachments/assets/4830b471-d232-458d-9f2f-75152e37fc17)



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
Para extrair a informação do SHA-1 utilizei o comando abaixo, funcional no git-bash:
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

Copiar o endereço do ClientID


## Criar página login

```
ionic g pages login
```

## Ajustar redirecionamento em app-routing.module.ts
```
{
	path: '',
	redirectTo: 'login',
	pathMatch: 'full'  // Redireciona para a página de login quando a rota é vazia
},
```

## Criar botão no login.page.html

```
  <ion-button expand="full" (click)="loginWithGoogle()">
	<ion-icon name="logo-google"></ion-icon>
	Login com Google
  </ion-button>
```

## Criar função em login.page.ts
```
  async loginWithGoogle(){
    this.user = await this.authService.googleSignIn()
    console.log(this.user)
    if(this.user){
      this.router.navigate(['/home'])
    }
  }
```  
## Criar serviço de autenticação
```
ionic g service service/auth
 ``` 

## Instalação do pacote codetrixstudio
```
npm i --save @codetrix-studio/capacitor-google-auth
```

## Sincronizando alterações 

Para sincronizar as mudanças feitas no código-fonte web (pasta www) ou nas configurações do projeto (como capacitor.config.json) com as plataformas nativas (Android, iOS).
```
npx cap update
```
## Comando executado para copiar
```
ionic capacitor copy android
```
## Abrir projeto no android studio
```
npx cap open android
```

## Ajustar o arquivo de auth.service.ts

```
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
```

## Adicionar no capacitor.config.ts configurações do plugin GoogleAuth

```
plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '80325311987-i5b75sjlgp9sgfjn38ob4ga95snmuo8g.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
```

## Adicionar meta tags no index.html

```
<meta name="google-signin-client_id" content="80325311987-i5b75sjlgp9sgfjn38ob4ga95snmuo8g.apps.googleusercontent.com" />
<meta name="google-signin-scope" content="profile email" />
```

## Criar arquivos para build android
```
ionic cap add android
```

## Ajustar classe MainActivity.java em "android\app\src\main\java\io\ionic\pocsso\MainActivity.java"
```
package io.ionic.starter;
import android.os.Bundle;
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
```

## Ajustar string.xml em "android\app\src\main\res\values\strings.xml"
```
<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">sso</string>
    <string name="title_activity_main">sso</string>
    <string name="package_name">io.ionic.starter</string>
    <string name="custom_url_scheme">io.ionic.starter</string>
    <string name="server_client_id">80325311987-i5b75sjlgp9sgfjn38ob4ga95snmuo8g.apps.googleusercontent.com</string>
</resources>
```
## Configuração projeto Google Console

Nome projeto: Single Sign-on

Client ID web: 446483931548-lbcv2a5409vsp068ci9oss5mtr67atva.apps.googleusercontent.com



Fonte: https://www.npmjs.com/package/@codetrix-studio/capacitor-google-auth


Vídeos: 
How to add Google SignIn to your Ionic 7 App
https://www.youtube.com/watch?v=_BmbLZdJks8


How to add Google Sign In using Capacitor to your Ionic App
https://www.youtube.com/watch?v=GwtpoWZ_78E

