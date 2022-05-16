import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardWritePageRoutingModule } from './board-write-routing.module';

import { BoardWritePage } from './board-write.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BoardWritePageRoutingModule,

  ],
  declarations: [BoardWritePage]
})
export class BoardWritePageModule {}
