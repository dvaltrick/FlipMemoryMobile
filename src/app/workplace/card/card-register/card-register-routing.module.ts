import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardRegisterPage } from './card-register.page';

const routes: Routes = [
  {
    path: '',
    component: CardRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardRegisterPageRoutingModule {}
