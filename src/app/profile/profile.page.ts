import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  profileImageUrl: string = ''; // Inicializa la URL de la imagen
  photo: string | undefined;

  constructor(
    private storage: AngularFireStorage,
    private loadingCtrl: LoadingController
  ) {}

  async uploadProfilePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos, // Para seleccionar de la galería
      });

      if (image && image.dataUrl) {
        await this.uploadImage(image.dataUrl);
      } else {
        console.error('No se pudo obtener la imagen de la galería.');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen de la galería:', error);
    }
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera // o CameraSource.Photos según tu caso
      });
      this.photo = image.webPath;
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      if ((error as Error).message === 'User cancelled photos app') {
        console.log('El usuario canceló la acción de tomar una foto.');
      }
    }
  }

  async uploadImage(dataUrl: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Subiendo imagen...',
    });
    await loading.present();

    const filePath = `profile_pictures/${new Date().getTime()}.jpg`;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.putString(dataUrl, 'data_url');

    task.snapshotChanges().pipe(
      finalize(async () => {
        try {
          this.profileImageUrl = await fileRef.getDownloadURL().toPromise();
          await loading.dismiss();
        } catch (error) {
          console.error('Error al obtener la URL de descarga:', error);
          await loading.dismiss();
        }
      })
    ).subscribe({
      next: () => {},
      error: async (error) => {
        console.error('Error al subir la imagen:', error);
        await loading.dismiss();
      }
    });
  }
}
