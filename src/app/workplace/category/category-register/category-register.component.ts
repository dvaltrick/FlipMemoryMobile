import { error } from 'util';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import Category from 'src/app/models/category';
import { Storage } from '@ionic/storage';
import { NavParams, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls: ['./category-register.component.scss'],
})
export class CategoryRegisterComponent implements OnInit {
  private category: Category = new Category();
  private token:string = "";

  constructor(private service:CategoryService,
    private storage: Storage,
    public modalCtrl: ModalController,
    private toast:ToastController) {
  }

  ngOnInit() {
    this.storage.get('token').then(token => {
      this.token = token;
    });
  }

  async closeModal(toRefresh = false) {
    this.modalCtrl.dismiss(toRefresh);
  }

  private validateCategory() {
    if (this.category.name === undefined || this.category.name.length < 3) {
      this.presentToast("O nome da categoria deve ter ao menos 3 caracteres", "warning");
      return false;
    }

    return true;
  }

  public save() {
    if (this.validateCategory()) {
      this.service.post(this.token, this.category).subscribe(
        data => {
          this.presentToast("Categoria salva com sucesso", "success");
          this.closeModal(true);
        },
        error => {
          this.presentToast("Falha ao salvar categoria", "danger");
        }
      );
    }
  }

  async presentToast(message, color) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  onChangeColor(color) {
    this.category.color = color;
  }

}
