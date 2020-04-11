import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import User from 'src/app/models/user';
import UserProfile from 'src/app/models/user-profile';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  private user = new User();
  private confirmPassword: string = "";

  constructor(public modalCtrl: ModalController,
              private service:UserService,
              private toastController:ToastController) {
    this.user.userProfile = new UserProfile();
  }

  ngOnInit() {}

  async closeModal(toRefresh = false) {
    this.modalCtrl.dismiss(toRefresh);
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

  private validateUser() {
    if (this.user.userProfile.name === undefined || this.user.userProfile.name.length < 3) {
      this.showToast("Informe seu nome para continuar", "warning");
      return false;
    }

    if (this.user.userProfile.email === undefined || this.user.userProfile.email.length < 3) {
      this.showToast("Informe seu email para continuar", "warning");
      return false;
    }

    if (this.user.userProfile.email.indexOf("@") < 2) {
      this.showToast("Informe um email com formato válido", "warning");
      return false;
    }

    if (this.user.username === undefined || this.user.username.length < 6) {
      this.showToast("O nome de usuário deve ter ao menos 6 caracteres", "warning");
      return false;
    }

    if (this.user.password === undefined || this.user.password.length < 6) {
      this.showToast("A senha deve ter ao menos 6 caracteres", "warning");
      return false;
    }

    if (this.user.password !== this.confirmPassword) {
      this.showToast("A senha não confere com a confirmação", "warning");
      return false;
    }

    return true;
  }

  save() {
    console.log(this.user);
    if (this.validateUser()) {
      this.service.post(this.user).subscribe(
        data => {
          this.showToast("Usuário cadastrado com sucesso", "success");
          this.closeModal();
        },
        error => {
          console.log(error);
          this.showToast("Erro ao realizar o cadastro: " + error, "danger");
        }
      );
    }
  }
}
