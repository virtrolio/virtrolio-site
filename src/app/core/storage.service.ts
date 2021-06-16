import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public static imagesBaseFolder = 'images';

  constructor(private storageService: AngularFireStorage) {}

  private static generatePath(messageId: string, extension: string): string {
    return `${this.imagesBaseFolder}/${messageId}/${uuidv4()}.${extension}`;
  }

  public async uploadImages(
    messageId: string,
    images: File[]
  ): Promise<Promise<string>[]> {
    if (images.length === 0) {
      return [];
    }
    return images.map(async (imageFile) => {
      const extension: string = imageFile.name.split('.').pop();
      const targetPath: string = StorageService.generatePath(
        messageId,
        extension
      );
      const targetStorageRef: AngularFireStorageReference =
        this.storageService.ref(targetPath);
      const uploadTask: AngularFireUploadTask = targetStorageRef.put(imageFile);
      // Wait for the upload to complete
      await uploadTask.snapshotChanges().toPromise();
      // Return the path
      return targetPath;
    });
  }
}
