import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardDetailModifyPageRoutingModule } from './board-detail-modify-routing.module';

import { BoardDetailModifyPage } from './board-detail-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BoardDetailModifyPageRoutingModule
  ],
  declarations: [BoardDetailModifyPage]
})
export class BoardDetailModifyPageModule {}
