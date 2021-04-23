import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'land',
    loadChildren: () => import('./components/land-page/land-page.module').then(m => m.LandPageModule),
  },
  {
    path: '',
    redirectTo: 'land',
    pathMatch: 'full'},
  {
    path: 'navbar',
    loadChildren: () => import('./components/navbar/navbar.module').then(m => m.NavbarModule),
  },
  {
    path: 'search-page',
    loadChildren: () => import('./components/search-page/search-page.module').then( m => m.SearchPagePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./components/settings/settings.module').then( m => m.SettingsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
