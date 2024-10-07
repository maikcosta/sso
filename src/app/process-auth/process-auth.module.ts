import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessAuthPageRoutingModule } from './process-auth-routing.module';

import { ProcessAuthPage } from './process-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessAuthPageRoutingModule
  ],
  declarations: [ProcessAuthPage]
})
export class ProcessAuthPageModule {}
