import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./workplace/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./workplace/play/play.module').then( m => m.PlayPageModule)
  },
  {
    path: 'card-register',
    loadChildren: () => import('./workplace/card/card-register/card-register.module').then( m => m.CardRegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
