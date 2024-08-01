import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'activities', loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesPageModule) },
  { path: 'add-activity', loadChildren: () => import('./add-activity/add-activity.module').then(m => m.AddActivityPageModule) },
  { path: 'edit-activity/:id', loadChildren: () => import('./edit-activity/edit-activity.module').then(m => m.EditActivityPageModule) },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
