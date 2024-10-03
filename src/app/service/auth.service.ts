import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, isPlatform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any = null;
  constructor(private platform:Platform) { 
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize()
    }
    this.platform.ready().then(()=>{
      GoogleAuth.initialize()
    })
  }
  setUser(user: any) {
    this.user = user;
  }

  isGoogleAuthenticated(): boolean {
    return this.user && this.user.hasOwnProperty('givenName');
  }

  isMicrosoftAuthenticated(): boolean {
    return this.user && this.user.hasOwnProperty('homeAccountId');
  }

  async googleSignIn() {
    this.user = await GoogleAuth.signIn();
    return await this.user;
  }
  microsoftSignIn(userData: any) {
    this.setUser(userData);
    console.log("Info User ->:",this.user)
  }
}
