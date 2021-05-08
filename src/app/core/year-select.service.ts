import { Injectable } from '@angular/core';
import { MsgIoService } from './msg-io.service';
import { VirtrolioDocument } from '../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class YearSelectService {
  yearList: number[] = [2021, 2020];
  currentYear: number = this.yearList[0];
  private messagesCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private msgIoService: MsgIoService) {
    this.messagesCollection = afs.collection('messages');
  }

  async getYearList() {
    /**
     * 1. Get a list of virtrolio documents
     * 2. Loop through and extract the unique years into a list
     * 3. Call this function onInit of the viewing component
     */
    await this.messagesCollection.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
      });
    });

    this.yearList = [2021, 2020];
  }

  /**
   * @param year - Year selected from dropdown menu
   */
  selectYear(year: number) {
    this.currentYear = year;
  }
}
