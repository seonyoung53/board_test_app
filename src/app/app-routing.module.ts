import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'board',
    loadChildren: () => import('./page/board/board.module').then(m => m.BoardPageModule)
  },
  {
    path: 'board-write',
    loadChildren: () => import('./page/board-write/board-write.module').then(m => m.BoardWritePageModule)
  },
  {
    path: 'board-detail-modify',
    loadChildren: () => import('./page/board-detail-modify/board-detail-modify.module').then(m => m.BoardDetailModifyPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
