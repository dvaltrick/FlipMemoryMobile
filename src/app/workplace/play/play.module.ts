import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayPageRoutingModule } from './play-routing.module';

import { PlayPage } from './play.page';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayPageRoutingModule
  ],
  entryComponents: [PopoverMenuComponent, CardComponent],
  declarations: [PlayPage, PopoverMenuComponent, CardComponent]
})
export class PlayPageModule {}
