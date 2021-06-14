import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-footer',
  templateUrl: './image-footer.component.html',
  styleUrls: ['./image-footer.component.css']
})
export class ImageFooterComponent implements OnInit {
  @Input() backColor: string;
  @Input() imageList: string[];
  @Output() popupMessage: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
