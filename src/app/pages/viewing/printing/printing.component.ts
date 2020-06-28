import { Component, OnInit } from '@angular/core';
import { FontService } from '../../../core/font.service';
import { Fonts } from '../../../shared/interfaces';
import { ViewingService } from '../viewing.service';

@Component({
  selector: 'app-printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.css']
})
export class PrintingComponent implements OnInit {
  fonts: Fonts;
  constructor(public viewService: ViewingService) {
    this.fonts = FontService.fonts;
  }

  ngOnInit(): void {
  }

  checkFont(font: string) {
    if (font in FontService.fonts) {
      return font;
    } else {
      return 'Arial';
    }
  }
}
