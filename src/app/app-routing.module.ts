import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';

import { UserComponent } from './pages/user/user.component';

import { UserInfoComponent } from './pages/user/user-info/user-info.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {

    path: 'welcome',

    component: WelcomeComponent

  },

  {

    path: 'user',

    component: UserComponent

  },

  {

    path: 'user/add',

    component: UserInfoComponent

  },

  {

    path: 'user/edit/:uuid',

    component: UserInfoComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,

    {

      useHash: true,// 使用 hash 模式

      preloadingStrategy: PreloadAllModules

    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
