import { Injectable } from '@angular/core';
import { Font, Fonts } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  static readonly fonts: Fonts = {
  };

  constructor() { }
}
