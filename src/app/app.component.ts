import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();

    // Inicialize o Storage
    await this.storage.create();

  }
}