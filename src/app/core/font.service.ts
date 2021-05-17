import { Injectable } from '@angular/core';
import { Font, Fonts } from '../shared/interfaces/fonts';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  // Note how you don't have to override the default values if you don't want to
  private static readonly Arial = new Font('Arial', 'sans-serif');
  private static readonly ComicSansMS = new Font('Comic Sans MS', 'sans-serif');
  private static readonly CourierNew = new Font('Courier New', 'monospace');
  private static readonly DancingScript = new Font('Dancing Script', 'cursive');
  private static readonly Montserrat = new Font('Montserrat', 'sans-serif');
  private static readonly Roboto = new Font('Roboto', 'sans-serif');
  private static readonly Merriweather = new Font('Merriweather', 'serif');
  private static readonly Lobster = new Font('Lobster', 'sans-serif');
  private static readonly IndieFlower = new Font('Indie Flower', 'sans-serif');
  private static readonly PatrickHand = new Font('Patrick Hand', 'sans-serif');
  private static readonly PermanentMarker = new Font('Permanent Marker', 'sans-serif');
  private static readonly Sacramento = new Font('Sacramento', 'cursive');
  private static readonly SpecialElite = new Font('Special Elite', 'sans-serif');
  private static readonly TimesNewRoman = new Font('Times New Roman', 'serif');
  private static readonly PoiretOne = new Font('Poiret One', 'sans-serif');
  private static readonly PressStart = new Font('Press Start', 'sans-serif');

  static readonly fonts: Fonts = {
    Arial: FontService.Arial,
    'Comic Sans MS': FontService.ComicSansMS,
    'Courier New': FontService.CourierNew,
    'Dancing Script': FontService.DancingScript,
    'Indie Flower': FontService.IndieFlower,
    Lobster: FontService.Lobster,
    Merriweather: FontService.Merriweather,
    Montserrat: FontService.Montserrat,
    'Patrick Hand': FontService.PatrickHand,
    'Permanent Marker': FontService.PermanentMarker,
    'Poiret One': FontService.PoiretOne,
    'Press Start': FontService.PressStart,
    Roboto: FontService.Roboto,
    Sacramento: FontService.Sacramento,
    'Special Elite': FontService.SpecialElite,
    'Times New Roman': FontService.TimesNewRoman
  };

  constructor() { }
}
