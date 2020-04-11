import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CardService } from 'src/app/service/card.service';
import { Storage } from '@ionic/storage';
import Card from 'src/app/models/card';
import Category from 'src/app/models/category';
import { ResponseService } from 'src/app/service/response.service';
import CardResponse from 'src/app/models/card-response';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  private card: Card =  new Card();
  private category: Category = new Category();
  private token: string = "";
  private enableButtons: Boolean = false;
  private found: Boolean = false;

  constructor(public popoverController: PopoverController,
              private storage: Storage,
              private cardService: CardService,
              private responseService: ResponseService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.storage.get('token').then(token => {
      this.token = token;
      this.findCard();
    });
  }

  findCard() {
    this.cardService.getRandom(this.token).subscribe(
      data => {
        if (data !== null) {
          this.card = data;
          this.category = data.categories[0];
          this.enableButtons = false;
          this.found = true;
        } else {
          this.found = false;
        }
      }
    );
  }

  onRevealed(revealed) {
    this.enableButtons = true;
  }

  response(result) {
    let response = new CardResponse();
    response.answer = result;
    response.card = this.card;

    this.responseService.post(this.token, response).subscribe(
      data => {
        this.findCard();
        this.showToast("Resposta enviada", "success");
      },
      error => {
        this.showToast("Falha ao enviar resposta, verifique sua conexão de internet", "danger");
      }
    );
  }

  public async showToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: "middle"
    });
    toast.present();
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
