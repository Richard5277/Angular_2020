import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { GreatingPipe } from 'src/app/shared/pipes/greating.pipe.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardComponent,
    GreatingPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [CardComponent]
})
export class CardModule { }
