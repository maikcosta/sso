import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user : any
  constructor(private authService:AuthService, private router:Router) {
    this.user = authService.user
  }

  onInit(){
    if(this.user == null){
      this.router.navigate(['/login'])
    }
  }
}
