import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';

import { IonicModule } from '@ionic/angular';

import { CardRegisterPageRoutingModule } from './card-register-routing.module';

import { CardRegisterPage } from './card-register.page';
import { OcrComponent } from './ocr/ocr.component';
import { OCR } from '@ionic-native/ocr/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModule,
    CardRegisterPageRoutingModule
  ],
  entryComponents: [OcrComponent],
  providers: [Camera, OCR, File, Crop],
  declarations: [CardRegisterPage, OcrComponent]
})
export class CardRegisterPageModule {}
