import { Injectable } from '@angular/core';
import { Observable, finalize, from, lastValueFrom, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {}

  async uploadImage(file: File): Promise<string> {
    const user = this.authService.currentUser;
    const filePath = `images/${user?.uid}/${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    await lastValueFrom(uploadTask.snapshotChanges());

    const downloadURL = await lastValueFrom(storageRef.getDownloadURL());

    return downloadURL;
  }
}


