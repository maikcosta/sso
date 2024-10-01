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
