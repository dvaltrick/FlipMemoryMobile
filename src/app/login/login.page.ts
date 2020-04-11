import { Component, OnInit } from '@angular/core';
import User from '../models/user';
import { UserService } from '../service/user.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private authUser: User;

  constructor(private service:UserService,
              private storage: Storage,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public modalController: ModalController,
              private router: Router) { 
    this.authUser = new User();
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

  public validateLogin() {
    if (this.authUser.username === undefined || this.authUser.username.length < 5) {
      this.showToast("Nome de usuário não informado ou fora do padrão", "warning");
      return false;
    }

    if (this.authUser.password === undefined || this.authUser.password.length < 6) {
      this.showToast("Senha não informada ou menor que 6 caracteres", "warning");
      return false;
    }

    return true;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewUserComponent
    });
    modal.onDidDismiss().then(
      refresh => {
        if (refresh.data) {
          console.log(refresh);
        }
      }
    );
    return await modal.present();
  }

  public async login() {
    if (!this.validateLogin()) return;

    const loading = await this.loadingController.create({
      message: 'Aguarde...'
    });
    await loading.present();
    
    this.service.login(this.authUser).subscribe(
      response => {
        if (response.headers !== undefined) {
          this.storage.set('token', response.headers.get("Authorization"));
          this.router.navigate(['play']);
        }

        loading.dismiss();
      },
      erro => {
        loading.dismiss();
        this.showToast("Login ou senha incorretos", "danger");
      }
    );
  }

}
