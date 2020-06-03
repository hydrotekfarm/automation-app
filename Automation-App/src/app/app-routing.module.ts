import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  //Lazyloading is used to load pages.
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule) }, 
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },

  // {path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
