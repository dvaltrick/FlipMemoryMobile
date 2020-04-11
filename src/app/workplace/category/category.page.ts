import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import Category from 'src/app/models/category';
import { error } from 'util';
import { Storage } from '@ionic/storage';

import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CategoryRegisterComponent } from './category-register/category-register.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  private categories: Category[] = [];
  private token: string = "";

  constructor(private service:CategoryService,
              private storage: Storage,
              public toastController: ToastController,
              public modalController: ModalController,
              private router: Router) { 
      this.load();
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

  public load() {
    this.categories = [];

    this.storage.get('token').then(token => {
      this.token = token;
      this.service.get(token).subscribe(
        data => {
          this.categories = data;
        },
        error => {
          this.showToast("Falha ao carregar categorias ", "danger");
        }
      );
    });
    
  }

  public delete(id) {
    this.service.delete(this.token, id).subscribe(
      data => {
        if (data.status == 200) {
          this.showToast("Categoria removida com sucesso", "success");
          this.load();
        } else {
          this.showToast("Falha ao remover categoria", "danger");
        }
      },
      error => {
        if (error.status == 200) {
          this.showToast("Categoria removida com sucesso", "success");
          this.load();
        } else {
          this.showToast("Falha ao remover categoria", "danger");
        }
      }
    );
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CategoryRegisterComponent
    });
    modal.onDidDismiss().then(
      refresh => {
        if (refresh.data) {
          this.load();
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
}
