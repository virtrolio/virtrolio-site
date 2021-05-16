import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }

  /**
   * Displays an error to the user using an alert and a human-readable prefix.
   * @param error - The error to display to the user.
   */
  static displayError(error) {
    alert('An error occurred. Here are the details that you can report to our team through the \'Contact Us\' page:\n' + error);
  }
}
