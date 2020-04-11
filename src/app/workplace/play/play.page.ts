import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      event: ev,
      translucent: true,
      componentProps: {popoverController: this.popoverController}
    });
    return await popover.present();
  }

}
