import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YearSelectService {
  yearList: number[] = [2021, 2020];
  currentYear: number = this.yearList[0];

  /**
   * @param year - Year selected from dropdown menu
   */
  selectYear(year: number) {
    this.currentYear = year;
  }
}
