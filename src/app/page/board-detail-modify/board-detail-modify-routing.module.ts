import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardDetailModifyPage } from './board-detail-modify.page';

const routes: Routes = [
  {
    path: '',
    component: BoardDetailModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardDetailModifyPageRoutingModule {}
