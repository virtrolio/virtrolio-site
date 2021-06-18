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
  public static readonly MESSAGE_IMG_BASE_PATH = 'messages';

  constructor(private storageService: AngularFireStorage) {}

  public static getFileExtension(file: File): string {
    return file.name.split('.').pop();
  }

  private static generatePath(messageId: string, extension: string): string {
    return `${
      StorageService.MESSAGE_IMG_BASE_PATH
    }/${messageId}/${uuidv4()}.${extension}`;
  }

  public async uploadImages(
    messageId: string,
    images: File[]
  ): Promise<Promise<string>[]> {
    if (images.length === 0) {
      return [];
    }
    return images.map(async (imageFile) => {
      const extension: string = StorageService.getFileExtension(imageFile);
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

  /**
   * Delete all files in the folder provided.
   *
   * @param folderPath - The folder to delete.
   */
  public async deleteFiles(folderPath: string): Promise<void> {
    this.storageService
      .ref(folderPath)
      .listAll()
      .toPromise()
      .then((res) => res.items.forEach((file) => file.delete()));
  }
}
