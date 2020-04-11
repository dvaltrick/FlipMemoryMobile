import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';
import { ToastController, ModalController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.scss'],
})
export class OcrComponent implements OnInit {
  @ViewChild('imageCropper', {static: true})
  imageCropper: ImageCropperComponent;
  
  private recognized = "";
  private capturedImage = "";
  private showImageCropper = false;
  private canvasRotation = 0;
  private transform: ImageTransform = {};

  constructor(private camera: Camera,
    private ocr: OCR,
    private toastController:ToastController,
    private file: File,
    private crop: Crop,
    public loadingController: LoadingController,
    private modal: ModalController) {
    this.recognized = "";
    this.runCamera();
  }

  ngOnInit() {}

  public async showToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color
    });
    toast.present();
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
      this.canvasRotation++;
      this.flipAfterRotate();
  }

  private flipAfterRotate() {
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
          ...this.transform,
          flipH: flippedV,
          flipV: flippedH
      };
  }

  public onRecognizedChanged(recognized) {
    this.recognized = recognized;
  }

  doOCR(imageURI, sourceType) {
    this.ocr.recText(sourceType, imageURI)
      .then((res: OCRResult) => {
        if (res.foundText && res.blocks.blocktext !== undefined) {
          this.recognized = "";
          res.blocks.blocktext.map(recText => {
            this.recognized = this.recognized + recText;
          });

          this.showImageCropper = true;
          this.showToast("Texto capturado com successo, realize as edições necessárias e salve para confirmar", "success");
        } else {
          this.showToast("Texto não capturado", "danger");
        }

        
      })
      .catch((error: any) => {
        this.showToast("Erro no reconhecimento de texto: " + JSON.stringify(error), "danger");
      });
  }

  imageCropped(event: ImageCroppedEvent) {
    let base64 = event.base64;
    let splitted = base64.split(",");
    let changedBase64 = splitted[1];
    
    this.doOCR(changedBase64, OCRSourceType.BASE64);
  }

  imageLoaded() {
    this.showImageCropper = true;
  }

  cropperReady() {
      this.showImageCropper = true;
  }

  loadImageFailed() {
    this.showImageCropper = true;
    this.showToast("Falha ao carregar imagem para tratamento", "danger");
  }

  async closeModal(recognized) {
    this.modal.dismiss(recognized);
  }

  save() {
    this.closeModal(this.recognized);
  }

  runCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      let imgPath =  imageData.substring(0,imageData.lastIndexOf('/')+1);
      this.file.readAsDataURL(imgPath, filename).then(res => {
        this.capturedImage = res;
      });

      this.doOCR(imageData, OCRSourceType.NORMFILEURL);
      /*
      this.crop.crop(imageData, {quality: 100}).then(path => {
        let filename = path.substring(path.lastIndexOf('/')+1);
        let imgPath =  path.substring(0,path.lastIndexOf('/')+1);
        this.file.readAsDataURL(imgPath, filename).then(res => {
          this.capturedImage = res;
        });
        this.doOCR(path);
      }); */

      //this.doOCR(imageData);
     }, (err) => {
      this.showToast("Erro na captura da iamgem: " + JSON.stringify(err), "danger");
     });
  }  
}
