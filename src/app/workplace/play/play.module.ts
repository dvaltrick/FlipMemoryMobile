import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayPageRoutingModule } from './play-routing.module';

import { PlayPage } from './play.page';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { CardComponent } from './card/card.component';
import { EmptyStateComponent } from 'src/app/ui/empty-state/empty-state.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayPageRoutingModule
  ],
  entryComponents: [PopoverMenuComponent, CardComponent, EmptyStateComponent],
  declarations: [PlayPage, PopoverMenuComponent, CardComponent, EmptyStateComponent]
})
export class PlayPageModule {}
