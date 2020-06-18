import { Injectable } from '@angular/core';
import { Font, Fonts } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  // Note how you don't have to override the default values if you don't want to
  private static readonly Arial = new Font('Arial', 'sans-serif', 'Arial');

  static readonly fonts: Fonts = {
    Arial: FontService.Arial
  };

  constructor() { }
}
