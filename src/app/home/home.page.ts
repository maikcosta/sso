import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user : any
  constructor(public authService:AuthService, private storage: Storage, private router:Router,private toastController: ToastController) {
    this.user = authService.user
  }

  onInit(){
    if(this.user == null){
      this.router.navigate(['/login'])
    }
  }

  async refresh() {
    if (this.authService.isGoogleAuthenticated()) {
      try {
        const authCode = await GoogleAuth.refresh();
        console.log('Refresh AuthCode (Google):', authCode);
        this.presentToast('Autenticação do Google atualizada com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar autenticação Google:', error);
        this.presentToast('Falha ao atualizar a autenticação do Google.');
      }
    } else if (this.authService.isMicrosoftAuthenticated()) {
      try {
        const account = await this.storage.get('userInfo');
        if (account) {
          // Opcional: Aqui você poderia buscar um novo token, se necessário.
          console.log('Microsoft Account:', account);
          this.presentToast('Autenticação da Microsoft atualizada com sucesso!');
        }
      } catch (error) {
        console.error('Erro ao atualizar autenticação Microsoft:', error);
        this.presentToast('Falha ao atualizar a autenticação da Microsoft.');
      }
    }
  }

  async signOut() {
    if (this.authService.isGoogleAuthenticated()) {
      await GoogleAuth.signOut();
    } else if (this.authService.isMicrosoftAuthenticated()) {
      await this.storage.clear;
      localStorage.clear();
      sessionStorage.clear();
    }

    this.user = null;
    this.router.navigate(['/login']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000, // Duração em milissegundos
      position: 'top', // Pode ser 'top', 'middle' ou 'bottom'
    });
    await toast.present();
  }
}
