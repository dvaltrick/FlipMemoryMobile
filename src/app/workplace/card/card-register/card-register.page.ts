import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/service/category.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import Category from 'src/app/models/category';
import Card from 'src/app/models/card';
import { CardService } from 'src/app/service/card.service';
import { OcrComponent } from './ocr/ocr.component';

@Component({
  selector: 'app-card-register',
  templateUrl: './card-register.page.html',
  styleUrls: ['./card-register.page.scss'],
})
export class CardRegisterPage implements OnInit {
  private categories: Category[] = [];
  private token: string = "";
  public card: Card = new Card();
  private selectedCategory: number = 0;

  constructor(private categoryService:CategoryService,
      private storage:Storage,
      private toastController:ToastController,
      public modalController: ModalController,
      private service:CardService) {
    this.storage.get('token').then(token => {
      this.token = token;
      this.card.question = "";
      this.card.answer = "";
      this.load();
    });
  }

  ngOnInit() {
  }

  public async showToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color
    });
    toast.present();
  }

  private prepareCard() {
    if (this.selectedCategory === undefined || this.selectedCategory === 0) {
      this.showToast("Selecione uma categoria para continuar", "warning");
      return false;
    } else {
      let category = this.categories.find(cat => {
        return cat.id == this.selectedCategory;
      });
      this.card.categories.push(category);
    }

    if (this.card.question === undefined || this.card.question.length === 0) {
      this.showToast("Digite a questão para continuar", "warning");
      return false;
    }

    if (this.card.answer === undefined || this.card.answer.length === 0) {
      this.showToast("Digite a resposta para continuar", "warning");
      return false;
    }

    return true;
  }

  public scanQuestion() {
    this.presentModal(1);
  }

  public scanAnswer() {
    this.presentModal(2);
  }

  async presentModal(type) {
    const modal = await this.modalController.create({
      component: OcrComponent
    });
    modal.onDidDismiss().then(
      recognized => {
        console.log("reco", recognized);
        if (recognized.data !== undefined && recognized.data.length > 0) {
          if (type === 1) {
            this.onQuestionChanged(recognized.data);
          } else {
            this.onAnswerChanged(recognized.data);
          }
        }
      }
    );
    return await modal.present();
  }

  public dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  public onQuestionChanged(question) {
    this.card.question = question;
  }

  public onAnswerChanged(answer) {
    this.card.answer = answer;
  }
  public onChangeCategory(catId) {
    this.selectedCategory = catId;
  }

  public save() {
    if (this.prepareCard()) {
      this.service.post(this.token, this.card).subscribe(
        data => {
          this.showToast("Cartão adicionado com sucesso a sua biblioteca!", "success");
          this.card = new Card();
        },
        error => {
          this.showToast("Falha ao incluir cartão", "danger");
        }
      );
    }
  }

  public load() {
    this.categoryService.get(this.token).subscribe(
      data => {
        this.categories = data;
      },
      error => {
        this.showToast("Falha ao carregar categorias ", "danger");
      }
    );
  }

}
