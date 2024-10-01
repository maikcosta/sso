import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user : any
  constructor(private authService:AuthService, private router:Router,private toastController: ToastController) {
    this.user = authService.user
  }

  onInit(){
    if(this.user == null){
      this.router.navigate(['/login'])
    }
  }

  async refresh() {
    try {
      const authCode = await GoogleAuth.refresh();
      console.log('Refresh AuthCode:', authCode);
      this.presentToast('Autenticação atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar autenticação:', error);
      this.presentToast('Falha ao atualizar a autenticação.');
    }
  }

  async singOut(){
    await GoogleAuth.signOut();
    this.user = null;
    this.router.navigate(['/login'])
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
