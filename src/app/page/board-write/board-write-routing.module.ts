import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardWritePage } from './board-write.page';

const routes: Routes = [
  {
    path: '',
    component: BoardWritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardWritePageRoutingModule {}
