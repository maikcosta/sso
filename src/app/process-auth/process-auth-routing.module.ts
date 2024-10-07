import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessAuthPage } from './process-auth.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessAuthPageRoutingModule {}
